-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROPERTIES TABLE
-- =====================================================
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  property_type TEXT CHECK (property_type IN ('penthouse', 'villa', 'apartment', 'townhouse', 'off-plan')) NOT NULL,
  price_aed BIGINT NOT NULL,
  price_usd BIGINT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  size_sqft INTEGER NOT NULL,
  size_sqm INTEGER NOT NULL,
  location TEXT NOT NULL,
  neighborhood TEXT,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved', 'off-plan')),
  completion_date DATE,
  developer TEXT,
  payment_plan TEXT,
  rental_yield DECIMAL(4,2),
  roi_estimate DECIMAL(4,2),
  golden_visa_eligible BOOLEAN DEFAULT false,
  main_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  video_tour_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 2. LEADS TABLE (CRM)
-- =====================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_code TEXT,
  budget_min_aed BIGINT,
  budget_max_aed BIGINT,
  property_type TEXT,
  bedrooms INTEGER,
  location_preference TEXT,
  timeline TEXT CHECK (timeline IN ('urgent', '1-3 months', '3-6 months', '6-12 months', 'exploring')),
  purpose TEXT CHECK (purpose IN ('personal residence', 'investment', 'golden visa', 'second home')),
  financing_needed BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'chatbot',
  lead_score INTEGER DEFAULT 0 CHECK (lead_score BETWEEN 0 AND 100),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'viewing_scheduled', 'negotiation', 'closed', 'lost')),
  notes TEXT,
  assigned_agent_id UUID,
  last_contact_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 3. VIEWINGS TABLE
-- =====================================================
CREATE TABLE viewings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  viewing_date DATE NOT NULL,
  viewing_time TIME NOT NULL,
  viewing_type TEXT DEFAULT 'in-person' CHECK (viewing_type IN ('in-person', 'virtual', 'video-call')),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 4. NEIGHBORHOODS TABLE
-- =====================================================
CREATE TABLE neighborhoods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT CHECK (category IN ('ultra-luxury', 'luxury', 'family-friendly', 'investment', 'waterfront')),
  avg_price_per_sqft_aed INTEGER,
  avg_roi DECIMAL(4,2),
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 5. CHAT LOGS TABLE (Analytics)
-- =====================================================
CREATE TABLE chat_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  user_message TEXT,
  agent_response TEXT,
  intent_detected TEXT,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 6. INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_status ON properties(status) WHERE status = 'available';
CREATE INDEX idx_properties_price ON properties(price_aed);
CREATE INDEX idx_properties_featured ON properties(is_featured) WHERE is_featured = true;
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_viewings_date_time ON viewings(viewing_date, viewing_time);
CREATE INDEX idx_chat_logs_session ON chat_logs(session_id);

-- =====================================================
-- 7. FUNCTION: CALCULATE LEAD SCORE
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_lead_score(
  p_budget_min BIGINT,
  p_timeline TEXT,
  p_financing_needed BOOLEAN
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Budget score (40 points max)
  IF p_budget_min >= 30000000 THEN
    score := score + 40; -- AED 30M+ = Ultra-HNW
  ELSIF p_budget_min >= 10000000 THEN
    score := score + 30; -- AED 10-30M = HNW
  ELSIF p_budget_min >= 2000000 THEN
    score := score + 20; -- AED 2-10M = Mid-Market
  ELSE
    score := score + 10;
  END IF;

  -- Timeline score (30 points max)
  CASE p_timeline
    WHEN 'urgent' THEN score := score + 30;
    WHEN '1-3 months' THEN score := score + 25;
    WHEN '3-6 months' THEN score := score + 15;
    WHEN '6-12 months' THEN score := score + 5;
    ELSE score := score + 0;
  END CASE;

  -- Financing score (30 points max - cash buyers score higher)
  IF p_financing_needed = false THEN
    score := score + 30;
  ELSE
    score := score + 10;
  END IF;

  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 8. TRIGGER: AUTO-UPDATE LEAD SCORE
-- =====================================================
CREATE OR REPLACE FUNCTION update_lead_score_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.budget_min_aed IS NOT NULL AND NEW.timeline IS NOT NULL THEN
    NEW.lead_score := calculate_lead_score(
      NEW.budget_min_aed,
      NEW.timeline,
      COALESCE(NEW.financing_needed, false)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_lead_score
BEFORE INSERT OR UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_lead_score_trigger();

-- =====================================================
-- 9. FUNCTION: CHECK VIEWING AVAILABILITY
-- =====================================================
CREATE OR REPLACE FUNCTION check_viewing_slots(
  p_date DATE,
  p_property_id UUID
)
RETURNS TABLE(available_time TIME) AS $$
BEGIN
  RETURN QUERY
  SELECT slot_time
  FROM (
    VALUES
      ('09:00'::TIME), ('10:00'::TIME), ('11:00'::TIME),
      ('14:00'::TIME), ('15:00'::TIME), ('16:00'::TIME), ('17:00'::TIME)
  ) AS slots(slot_time)
  WHERE slot_time NOT IN (
    SELECT viewing_time
    FROM viewings
    WHERE viewing_date = p_date
      AND property_id = p_property_id
      AND status IN ('scheduled', 'completed')
  );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 10. TRIGGER: AUTO-UPDATE TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_viewings_updated_at
BEFORE UPDATE ON viewings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- 11. ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewings ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Public can read available properties
CREATE POLICY "Public can read available properties"
  ON properties FOR SELECT
  USING (status = 'available' OR is_featured = true);

-- Public can read all neighborhoods
CREATE POLICY "Public can read neighborhoods"
  ON neighborhoods FOR SELECT
  USING (true);

-- Public can insert leads (for chatbot)
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Public can insert viewings (for chatbot)
CREATE POLICY "Public can insert viewings"
  ON viewings FOR INSERT
  WITH CHECK (true);

-- Public can insert chat logs
CREATE POLICY "Public can insert chat logs"
  ON chat_logs FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- 12. HELPER FUNCTION: GET PROPERTY BY SLUG
-- =====================================================
CREATE OR REPLACE FUNCTION get_property_by_slug(p_slug TEXT)
RETURNS SETOF properties AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM properties
  WHERE slug = p_slug
    AND status = 'available';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 13. HELPER FUNCTION: INCREMENT PROPERTY VIEWS
-- =====================================================
CREATE OR REPLACE FUNCTION increment_property_views(p_property_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE properties
  SET views_count = views_count + 1
  WHERE id = p_property_id;
END;
$$ LANGUAGE plpgsql;
