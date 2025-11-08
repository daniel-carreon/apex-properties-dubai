# 🏙️ Apex Properties Dubai - AI-Powered Ultra-Luxury Real Estate Platform

A full-stack, production-ready real estate application featuring AI-powered property consultation, built with Next.js 14, Supabase, and Claude AI.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Claude AI](https://img.shields.io/badge/Claude-AI--Powered-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4)

---

## 🎯 Overview

This application was built **in one shot** to demonstrate the power of AI-assisted development. It's a complete, production-ready luxury real estate platform for Dubai with:

- **8 Pre-loaded Properties**: Penthouses, villas, waterfront properties
- **AI Chatbot**: Claude-powered property consultant with function calling
- **Luxury UI**: Black & Gold theme with glassmorphism and parallax effects
- **Full CRM**: Lead management with automated scoring
- **Property Search**: Advanced filtering by type, price, location, Golden Visa eligibility
- **Responsive Design**: Mobile-first, works on all devices

---

## ✨ Features

### 🏠 Property Management
- **8 Luxury Properties** pre-loaded (AED 3.2M - AED 120M)
- Advanced filtering (type, bedrooms, location, price, Golden Visa)
- Property detail pages with image galleries
- ROI and rental yield calculations
- Similar properties recommendations

### 🤖 AI-Powered Chatbot
- **Claude Sonnet 4.5** integration
- Function calling for property search
- Lead qualification and capture
- Golden Visa eligibility checking
- Natural language property recommendations

### 💼 CRM & Lead Management
- Automated lead scoring (0-100)
- Timeline tracking (urgent, 1-3 months, 3-6 months, etc.)
- Purpose classification (investment, residence, Golden Visa)
- Contact information capture

### 🎨 Premium UI/UX
- **Luxury Black & Gold Theme**
- Glassmorphism effects
- Parallax scrolling
- Smooth animations with Framer Motion
- Custom fonts: Playfair Display, Montserrat, Orbitron, Inter

### 📱 Fully Responsive
- Mobile-optimized layouts
- Tablet and desktop views
- Hamburger menu for mobile

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom luxury theme)
- **Framer Motion** (animations)
- **Lucide React** (icons)

### Backend
- **Supabase** (PostgreSQL database)
- **Next.js API Routes** (serverless functions)
- **Anthropic Claude API** (AI chatbot)

### Database Schema
- `properties` - 8 luxury properties
- `leads` - CRM with automated scoring
- `viewings` - Property viewing scheduler
- `neighborhoods` - 10 Dubai neighborhoods
- `chat_logs` - Chatbot conversation analytics

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Anthropic API key

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd fabrica-de-saas

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Anthropic credentials
```

### Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migrations:
   - `supabase/migrations/001_init_schema.sql`
   - `supabase/migrations/002_seed_properties.sql`
   - `supabase/migrations/003_seed_neighborhoods.sql`
3. Copy Project URL and anon key to `.env.local`

### Get Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add to `.env.local`

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**📖 Full setup guide:** See [SETUP.md](./SETUP.md)

---

## 📁 Project Structure

```
fabrica-de-saas/
├── app/                          # Next.js App Router
│   ├── api/chatbot/             # AI chatbot endpoint
│   ├── properties/[slug]/       # Dynamic property pages
│   ├── layout.tsx               # Root layout (Header, Footer, ChatWidget)
│   ├── page.tsx                 # Homepage (Hero + PropertyGrid)
│   └── globals.css              # Global styles + luxury theme
│
├── features/                     # Feature-First Architecture
│   ├── properties/              # Property feature
│   │   ├── components/          # PropertyCard, PropertyGrid
│   │   ├── services/            # propertyService (Supabase)
│   │   └── types/
│   ├── chatbot/                 # AI Chatbot feature
│   │   ├── components/          # ChatWidget
│   │   └── services/            # leadService
│   └── viewings/                # Viewing scheduler
│       └── services/            # viewingService
│
├── shared/                       # Reusable components & utilities
│   ├── components/              # Button, Card, Input, Badge, Hero, Header, Footer
│   ├── lib/                     # supabase.ts, utils.ts
│   └── types/                   # database.ts (Supabase types)
│
├── supabase/migrations/         # SQL migrations
│   ├── 001_init_schema.sql     # Tables, indexes, RLS policies
│   ├── 002_seed_properties.sql # 8 luxury properties
│   └── 003_seed_neighborhoods.sql
│
├── public/                       # Static assets
├── tailwind.config.ts           # Custom luxury theme (Black & Gold)
├── next.config.js               # Next.js config (image domains)
├── package.json                 # Dependencies
├── .env.example                 # Environment variables template
└── SETUP.md                     # Full setup instructions
```

---

## 🎨 Design System

### Colors (Black & Gold Luxury Theme)
- **Primary**: `#0A0A0A` (Deep Black)
- **Secondary**: `#D4AF37` (Rich Gold)
- **Accent**: `#1E1E1E` (Charcoal Gray)
- **Background**: `#FAFAFA` (Off-White)

### Typography
- **Headings**: Playfair Display (Serif)
- **Subheadings**: Montserrat (Sans-Serif)
- **Body**: Inter (Sans-Serif)
- **Prices/Numbers**: Orbitron (Monospace)

### Effects
- Glassmorphism (frosted glass backgrounds)
- Parallax scrolling
- Gold glow shadows
- Smooth animations (fade-in, slide-up)

---

## 🤖 AI Chatbot Capabilities

The AI consultant can:

✅ Search properties by type, price, location, bedrooms
✅ Recommend properties based on budget and preferences
✅ Check Golden Visa eligibility
✅ Provide ROI and rental yield data
✅ Capture lead information (name, email, phone, budget)
✅ Qualify leads with automated scoring
✅ Answer Dubai real estate questions

### Example Conversation

**User:** "Show me villas in Palm Jumeirah under AED 100M"
**AI:** *Uses `get_property_portfolio` tool*
"I found 2 exclusive villas in Palm Jumeirah within your budget..."

**User:** "Does the AED 85M villa qualify for Golden Visa?"
**AI:** *Uses `check_golden_visa_eligibility` tool*
"Yes! This property well exceeds the AED 2M threshold..."

---

## 📊 Database Schema Highlights

### Properties Table
- 8 luxury properties (penthouses, villas, off-plan)
- Price range: AED 3.2M - AED 120M
- Features: Golden Visa eligibility, ROI estimates, rental yields
- Auto-increment view counter

### Leads Table
- Automated lead scoring (budget + timeline + financing)
- Status tracking (new → contacted → viewing_scheduled → closed)
- Timestamps for last contact

### Functions & Triggers
- `calculate_lead_score()` - Automated lead qualification
- `check_viewing_slots()` - Available time slots
- `increment_property_views()` - Track property interest

---

## 🔒 Security

- **Row Level Security (RLS)** enabled on all tables
- Environment variables for API keys
- Public can only:
  - Read available properties
  - Insert leads (for chatbot)
  - Insert viewing requests
- Server-side API routes protect sensitive operations

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`

### Build for Production

```bash
npm run build
npm run start
```

---

## 📈 Future Enhancements

- [ ] Virtual property tours (3D Matterport integration)
- [ ] Mortgage calculator
- [ ] Email campaigns for leads
- [ ] Agent dashboard for CRM
- [ ] WhatsApp integration
- [ ] Property comparison tool
- [ ] Neighborhood guides
- [ ] Market insights dashboard

---

## 🎥 YouTube Demo

This application was built **live on YouTube** in a single session to showcase:

- AI-assisted full-stack development
- Feature-First architecture
- One-shot implementation (minimal iterations)
- Production-ready code quality

---

## 📜 License

MIT License - Feel free to use this as a template for your own projects!

---

## 🙏 Credits

**Built by AI-Assisted Development**
- Powered by Claude Sonnet 4.5 (code generation)
- Next.js 14 (framework)
- Supabase (backend)
- Anthropic Claude API (chatbot intelligence)

**Images**: Unsplash (Dubai skyline, luxury properties)

---

**⭐ If you found this useful, give it a star!**

Built with 🤖 + ❤️ for the future of real estate technology.
