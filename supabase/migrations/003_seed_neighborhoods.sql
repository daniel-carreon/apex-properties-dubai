-- =====================================================
-- INSERT DUBAI NEIGHBORHOODS
-- =====================================================

INSERT INTO neighborhoods (
  name, slug, category, avg_price_per_sqft_aed, avg_roi, description, amenities, image_url
) VALUES

-- Ultra-Luxury Neighborhoods
(
  'Palm Jumeirah',
  'palm-jumeirah',
  'ultra-luxury',
  2800,
  6.5,
  'The iconic man-made island shaped like a palm tree. Home to ultra-luxury villas, beachfront living, and the Atlantis resort. Dubai''s most prestigious waterfront address.',
  ARRAY['Private Beaches', 'Beach Clubs', 'Fine Dining', 'Luxury Hotels', 'Water Sports', 'Monorail Access', 'Marina Berths'],
  'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800'
),

(
  'Emirates Hills',
  'emirates-hills',
  'ultra-luxury',
  3200,
  5.5,
  'Dubai''s "Beverly Hills" - ultra-exclusive gated community with sprawling mansions, championship golf course, and private lakes. The pinnacle of luxury living.',
  ARRAY['Golf Course', 'Gated Community', 'Private Lakes', '24/7 Security', 'Tennis Courts', 'Parks'],
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
),

(
  'Jumeirah Bay Island',
  'jumeirah-bay-island',
  'ultra-luxury',
  4500,
  6.0,
  'Home to the exclusive Bulgari Resort & Residences. Ultra-private island with yacht berths, private beaches, and world-class amenities. Limited inventory.',
  ARRAY['Bulgari Resort', 'Private Beach', 'Yacht Berths', 'Michelin Dining', 'Spa', 'Concierge Service'],
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800'
),

-- Luxury Neighborhoods
(
  'Downtown Dubai',
  'downtown-dubai',
  'luxury',
  2200,
  7.0,
  'The heart of Dubai featuring Burj Khalifa, Dubai Mall, and Dubai Fountain. Mix of luxury apartments and penthouses with unparalleled urban living.',
  ARRAY['Burj Khalifa', 'Dubai Mall', 'Dubai Fountain', 'Metro Access', 'World-Class Dining', 'Opera District'],
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'
),

(
  'Dubai Marina',
  'dubai-marina',
  'luxury',
  1800,
  8.0,
  'Vibrant waterfront community with modern high-rises, marina promenade, beach clubs, and cosmopolitan lifestyle. High rental yields and strong appreciation.',
  ARRAY['Marina Promenade', 'Beach Access', 'Yacht Clubs', 'Dining & Nightlife', 'Metro Access', 'JBR Beach'],
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800'
),

(
  'Dubai Hills Estate',
  'dubai-hills-estate',
  'family-friendly',
  1600,
  7.5,
  'Master-planned family community with championship golf course, parks, schools, and Dubai Hills Mall. Perfect blend of luxury and family-friendly living.',
  ARRAY['Golf Course', 'Parks', 'Schools', 'Dubai Hills Mall', 'Community Pools', 'Cycling Tracks'],
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
),

-- Investment Neighborhoods
(
  'Business Bay',
  'business-bay',
  'investment',
  1400,
  10.0,
  'Dubai''s business hub with modern apartments, Dubai Canal views, and proximity to Downtown. Excellent investment opportunity with high rental yields.',
  ARRAY['Dubai Canal', 'Metro Access', 'Business District', 'Dining', 'Parks', 'Marasi Marina'],
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800'
),

(
  'Dubai Creek Harbour',
  'dubai-creek-harbour',
  'investment',
  1200,
  9.5,
  'Dubai''s newest waterfront mega-development. Home to the future Dubai Creek Tower. High growth potential with attractive payment plans for off-plan properties.',
  ARRAY['Creek Beach', 'Creek Island', 'Waterfront Promenade', 'Parks', 'Retail', 'Dubai Creek Tower'],
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
),

-- Waterfront Neighborhoods
(
  'Bluewaters Island',
  'bluewaters-island',
  'waterfront',
  2000,
  7.8,
  'Home to Ain Dubai (Dubai Eye), this vibrant island offers beachfront living, luxury residences, and entertainment. Connected to JBR Beach.',
  ARRAY['Ain Dubai', 'Beach Access', 'Dining', 'Entertainment', 'Caesars Palace Hotel', 'Madame Tussauds'],
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800'
),

(
  'La Mer',
  'la-mer',
  'waterfront',
  2400,
  7.2,
  'Beachfront lifestyle destination with colorful architecture, beach clubs, and water sports. Bohemian vibe meets luxury living.',
  ARRAY['Private Beach', 'Beach Clubs', 'Water Sports', 'Dining', 'Retail', 'Kids Play Areas'],
  'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800'
);
