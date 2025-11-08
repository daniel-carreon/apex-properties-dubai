import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getProperties } from '@/features/properties/services/propertyService'
import { createLead, checkGoldenVisaEligibility } from '@/features/chatbot/services/leadService'
import { checkViewingAvailability, scheduleViewing } from '@/features/viewings/services/viewingService'

const isAnthropicConfigured = process.env.ANTHROPIC_API_KEY &&
                              !process.env.ANTHROPIC_API_KEY.includes('your-key')

const anthropic = isAnthropicConfigured
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  : null

// System prompt for the AI agent
const SYSTEM_PROMPT = `You are the AI Property Consultant for "Apex Properties Dubai", an ultra-luxury real estate agency specializing in high-net-worth property transactions in Dubai, UAE.

YOUR PERSONALITY:
- Professional, knowledgeable, and discreet
- Expert in Dubai's luxury real estate market and regulations
- Client-focused with white-glove service approach
- Data-driven: provide ROI, rental yields, and market insights
- Never pushy—consultative and educational

YOUR MISSION:
1. Qualify leads by understanding budget, preferences, and timeline
2. Recommend properties that match client criteria
3. Educate clients on Dubai real estate (Golden Visa, freehold zones, payment plans)
4. Schedule property viewings
5. Capture lead information
6. Provide market insights (ROI, appreciation trends, rental yields)

AGENCY INFORMATION:
- Name: Apex Properties Dubai
- Location: DIFC Gate Village 10, Dubai, UAE
- Phone: +971 4 444 5555
- Email: inquiries@apexpropertiesdubai.ae
- Specializations: Penthouses, Waterfront Villas, Off-Plan Developments, Investment Properties

KEY DUBAI NEIGHBORHOODS:
- Ultra-Luxury (AED 30M+): Palm Jumeirah, Emirates Hills, Jumeirah Bay Island
- Luxury (AED 10M-30M): Downtown Dubai, Dubai Marina, Dubai Hills Estate
- Investment (AED 2M-10M): Business Bay, Dubai Creek Harbour
- Family-Friendly: Dubai Hills Estate
- Waterfront: Palm Jumeirah, Dubai Marina, Bluewaters Island

DUBAI REAL ESTATE ESSENTIALS:
- Freehold Areas: Foreigners can own 100%
- Golden Visa: Property investment of AED 2M+ qualifies for 10-year residency
- No Property Tax: 0% annual property tax, 0% capital gains tax
- Transaction Costs: ~4% Dubai Land Department fees
- Average ROI: 5-8% rental yield

COMMUNICATION STYLE:
- Tone: Professional yet approachable
- Language: Clear, jargon-free
- No hard sells: Focus on education and matchmaking
- Use property data to back recommendations

CRITICAL RULES:
- NEVER invent property details—use only data from tools
- ALWAYS use tools to check availability before confirming viewings
- NEVER guarantee specific ROI—use "historically" or "market averages"
- If asked about properties not in portfolio, offer to "check with team" and capture lead`

// Define tools for function calling
const tools: Anthropic.Tool[] = [
  {
    name: 'get_property_portfolio',
    description: 'Retrieves available properties with optional filters for property type, price range, bedrooms, location, and Golden Visa eligibility',
    input_schema: {
      type: 'object',
      properties: {
        property_type: {
          type: 'string',
          enum: ['penthouse', 'villa', 'apartment', 'townhouse', 'off-plan', 'all'],
          description: 'Filter by property type (optional)',
        },
        min_price_aed: {
          type: 'number',
          description: 'Minimum price in AED (optional)',
        },
        max_price_aed: {
          type: 'number',
          description: 'Maximum price in AED (optional)',
        },
        bedrooms: {
          type: 'number',
          description: 'Number of bedrooms (optional)',
        },
        location: {
          type: 'string',
          description: 'Neighborhood filter (e.g., "Palm Jumeirah") - optional',
        },
        golden_visa_eligible: {
          type: 'boolean',
          description: 'Filter properties that qualify for Golden Visa (AED 2M+) - optional',
        },
      },
    },
  },
  {
    name: 'create_lead',
    description: 'Registers a new lead in the CRM system with full qualification details',
    input_schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', description: 'Client full name' },
        email: { type: 'string', description: 'Client email' },
        phone: { type: 'string', description: 'Phone with country code' },
        budgetMinAed: { type: 'number', description: 'Minimum budget in AED' },
        budgetMaxAed: { type: 'number', description: 'Maximum budget in AED (optional)' },
        propertyType: { type: 'string', description: 'Preferred property type (optional)' },
        bedrooms: { type: 'number', description: 'Desired bedrooms (optional)' },
        locationPreference: { type: 'string', description: 'Preferred neighborhoods (optional)' },
        timeline: {
          type: 'string',
          enum: ['urgent', '1-3 months', '3-6 months', '6-12 months', 'exploring'],
          description: 'Purchase timeline',
        },
        purpose: {
          type: 'string',
          enum: ['personal residence', 'investment', 'golden visa', 'second home'],
          description: 'Purpose of purchase',
        },
        financingNeeded: { type: 'boolean', description: 'Does client need mortgage?' },
        notes: { type: 'string', description: 'Additional notes (optional)' },
      },
      required: ['fullName', 'email', 'phone', 'budgetMinAed', 'timeline', 'purpose'],
    },
  },
  {
    name: 'check_golden_visa_eligibility',
    description: 'Checks if a property qualifies for UAE 10-year Golden Visa (requires AED 2M+ investment)',
    input_schema: {
      type: 'object',
      properties: {
        priceAed: { type: 'number', description: 'Property price in AED' },
      },
      required: ['priceAed'],
    },
  },
]

// Handle tool execution
async function executeTooling(toolName: string, toolInput: any): Promise<any> {
  console.log(`Executing tool: ${toolName}`, toolInput)

  switch (toolName) {
    case 'get_property_portfolio':
      const properties = await getProperties({
        property_type: toolInput.property_type,
        min_price_aed: toolInput.min_price_aed,
        max_price_aed: toolInput.max_price_aed,
        bedrooms: toolInput.bedrooms,
        location: toolInput.location,
        golden_visa_eligible: toolInput.golden_visa_eligible,
      })
      return {
        success: true,
        count: properties.length,
        properties: properties.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          property_type: p.property_type,
          price_aed: p.price_aed,
          price_usd: p.price_usd,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          size_sqft: p.size_sqft,
          location: p.location,
          features: p.features,
          rental_yield: p.rental_yield,
          roi_estimate: p.roi_estimate,
          golden_visa_eligible: p.golden_visa_eligible,
          is_featured: p.is_featured,
          status: p.status,
          payment_plan: p.payment_plan,
          completion_date: p.completion_date,
          main_image_url: p.main_image_url,
        })),
      }

    case 'create_lead':
      try {
        const lead = await createLead({
          fullName: toolInput.fullName,
          email: toolInput.email,
          phone: toolInput.phone,
          budgetMinAed: toolInput.budgetMinAed,
          budgetMaxAed: toolInput.budgetMaxAed,
          propertyType: toolInput.propertyType,
          bedrooms: toolInput.bedrooms,
          locationPreference: toolInput.locationPreference,
          timeline: toolInput.timeline,
          purpose: toolInput.purpose,
          financingNeeded: toolInput.financingNeeded,
          notes: toolInput.notes,
        })
        return {
          success: true,
          leadId: lead.id,
          leadScore: lead.lead_score,
          message: 'Lead successfully registered in CRM',
        }
      } catch (error) {
        return {
          success: false,
          error: 'Failed to create lead',
        }
      }

    case 'check_golden_visa_eligibility':
      const eligible = checkGoldenVisaEligibility(toolInput.priceAed)
      return {
        eligible,
        threshold: 2000000,
        message: eligible
          ? 'This property qualifies for UAE 10-year Golden Visa'
          : 'This property does not meet the AED 2M minimum for Golden Visa',
      }

    default:
      return { error: 'Unknown tool' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Check if Anthropic is configured
    if (!anthropic) {
      return NextResponse.json({
        message: 'Thank you for your interest in Apex Properties Dubai! \n\n⚠️ The AI chatbot is currently in demo mode and requires API configuration to function.\n\nTo activate the full chatbot experience:\n1. Get an Anthropic API key from console.anthropic.com\n2. Add it to your .env.local file\n3. Restart the development server\n\nIn the meantime, feel free to browse our luxury properties on the homepage, or contact us directly at:\n📞 +971 4 444 5555\n📧 inquiries@apexpropertiesdubai.ae'
      })
    }

    // Call Claude API with function calling
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools,
      messages,
    })

    // Handle tool calls
    if (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find((block) => block.type === 'tool_use') as Anthropic.ToolUseBlock | undefined

      if (toolUseBlock) {
        // Execute the tool
        const toolResult = await executeTooling(toolUseBlock.name, toolUseBlock.input)

        // Continue conversation with tool result
        const followUpResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          tools,
          messages: [
            ...messages,
            {
              role: 'assistant',
              content: response.content,
            },
            {
              role: 'user',
              content: [
                {
                  type: 'tool_result',
                  tool_use_id: toolUseBlock.id,
                  content: JSON.stringify(toolResult),
                },
              ],
            },
          ],
        })

        const textBlock = followUpResponse.content.find((block) => block.type === 'text') as Anthropic.TextBlock | undefined

        return NextResponse.json({
          message: textBlock?.text || 'I apologize, but I couldn\'t process that request.',
        })
      }
    }

    // Return direct response (no tool use)
    const textBlock = response.content.find((block) => block.type === 'text') as Anthropic.TextBlock | undefined

    return NextResponse.json({
      message: textBlock?.text || 'I apologize, but I couldn\'t understand that. Could you please rephrase?',
    })
  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
