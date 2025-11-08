# 🚀 Apex Properties Dubai - Setup Guide

Complete setup instructions for running the application locally.

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm or pnpm
- Supabase account
- Anthropic API account (for chatbot)

---

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Set:
   - Project name: `apex-properties-dubai`
   - Database password: (generate strong password)
   - Region: Choose closest to your users

### 1.2 Run Database Migrations

Once your project is created:

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"**
3. Copy and paste the contents of `supabase/migrations/001_init_schema.sql`
4. Click **"Run"**

5. Repeat for:
   - `supabase/migrations/002_seed_properties.sql`
   - `supabase/migrations/003_seed_neighborhoods.sql`

### 1.3 Get Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (optional, for advanced features)

---

## 🔑 Step 2: Get Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Go to **API Keys**
4. Click **"Create Key"**
5. Copy your API key (starts with `sk-ant-...`)

⚠️ **Important**: Add credits to your Anthropic account if you haven't already.

---

## ⚙️ Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic API (for AI Chatbot)
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📦 Step 4: Install Dependencies

```bash
npm install
```

---

## 🚀 Step 5: Run Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

---

## ✅ Step 6: Verify Setup

### Test 1: Homepage Loads

- Open [http://localhost:3000](http://localhost:3000)
- You should see the Dubai skyline hero section

### Test 2: Properties Load

- Scroll down to "Exclusive Property Collection"
- You should see 8 luxury properties loaded from Supabase

### Test 3: Property Details

- Click on any property
- Property detail page should load with full information

### Test 4: AI Chatbot

- Click the chatbot icon (bottom right)
- Send a message like: "Show me villas in Palm Jumeirah"
- The AI should respond with property recommendations

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Make sure `.env.local` exists and contains valid `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: No properties showing

**Solution**:
1. Check Supabase dashboard → **Table Editor** → `properties` table
2. Verify that 8 properties were inserted
3. If empty, re-run `002_seed_properties.sql` in SQL Editor

### Issue: Chatbot not responding

**Solution**:
1. Verify `ANTHROPIC_API_KEY` in `.env.local`
2. Check Anthropic dashboard for API credits
3. Open browser console (F12) to see error messages

### Issue: "Cannot find module '@/...' "

**Solution**:
```bash
# Delete .next cache and node_modules
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Next Steps

### Customize Properties

1. Go to Supabase dashboard → **Table Editor** → `properties`
2. Edit existing properties or add new ones
3. Update images by changing `main_image_url` and `gallery_images` fields

### Deploy to Production

#### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Then add environment variables in Vercel dashboard.

#### Option 2: Other Platforms

Ensure you set all environment variables from `.env.local` in your hosting platform's settings.

---

## 🎨 Brand Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#0A0A0A', // Change this to your brand color
  },
  secondary: {
    DEFAULT: '#D4AF37', // Change this to your accent color
  },
}
```

### Change Agency Name

Search and replace "Apex Properties Dubai" throughout the codebase:

```bash
grep -r "Apex Properties" .
```

---

## 📞 Support

If you encounter issues not covered here:

1. Check browser console for errors (F12)
2. Check server logs in terminal
3. Review Supabase logs in dashboard → **Logs**
4. Review Anthropic API usage in dashboard

---

**Built with Next.js 14 + Supabase + Claude AI** 🚀
