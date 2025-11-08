-- =====================================================
-- INSERT 8 LUXURY DUBAI PROPERTIES
-- =====================================================

INSERT INTO properties (
  title, slug, property_type, price_aed, price_usd,
  bedrooms, bathrooms, size_sqft, size_sqm,
  location, neighborhood, description, features,
  status, developer, rental_yield, roi_estimate,
  golden_visa_eligible, main_image_url, gallery_images,
  is_featured
) VALUES

-- 1. Burj Khalifa Penthouse
(
  'Burj Khalifa Penthouse - Sky Collection',
  'burj-khalifa-penthouse-sky-collection',
  'penthouse',
  45000000,
  12250000,
  5,
  6,
  12000,
  1115,
  'Downtown Dubai',
  'Burj Khalifa District',
  'Exclusive 5-bedroom penthouse on the 118th floor of the world''s tallest building. Unparalleled 360° views of Dubai''s skyline, private elevator, Armani Casa interiors, and access to the Armani Hotel spa and fine dining.',
  ARRAY['Private Elevator', 'Armani Casa Interiors', '360° Skyline Views', 'Smart Home Automation', 'Concierge Service', 'Spa Access', 'Wine Cellar', 'Private Cinema'],
  'available',
  'Emaar Properties',
  5.2,
  6.5,
  true,
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
  ],
  true
),

-- 2. Palm Jumeirah Signature Villa
(
  'Palm Jumeirah Signature Villa',
  'palm-jumeirah-signature-villa',
  'villa',
  85000000,
  23140000,
  7,
  8,
  15000,
  1394,
  'Palm Jumeirah',
  'Frond G',
  'Ultra-luxury 7-bedroom beachfront villa with 100 feet of private beach, infinity pool overlooking the Arabian Gulf, private cinema, gym, and spa. Contemporary design by world-renowned architects.',
  ARRAY['100ft Private Beach', 'Infinity Pool', 'Private Cinema', 'Home Gym', 'Spa', 'Smart Home', 'Staff Quarters', 'Panoramic Gulf Views'],
  'available',
  'Nakheel',
  4.8,
  7.2,
  true,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
  ],
  true
),

-- 3. Dubai Marina Bay Penthouse
(
  'Marina Bay Penthouse - Waterfront Living',
  'marina-bay-penthouse-waterfront-living',
  'penthouse',
  28000000,
  7620000,
  4,
  5,
  8500,
  790,
  'Dubai Marina',
  'Marina Promenade',
  'Stunning 4-bedroom penthouse with floor-to-ceiling windows, wraparound terrace, infinity pool, and direct marina views. Walking distance to world-class dining, shopping, and nightlife.',
  ARRAY['Private Pool', 'Wraparound Terrace', 'Marina Views', 'Smart Home', 'Walk-in Closets', 'High-End Appliances', 'Maid''s Room', 'Private Parking'],
  'available',
  'Emaar Properties',
  6.5,
  8.0,
  true,
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
  ],
  true
),

-- 4. Jumeirah Bay Island Villa
(
  'Jumeirah Bay Island - Bulgari Villa',
  'jumeirah-bay-island-bulgari-villa',
  'villa',
  55000000,
  14970000,
  6,
  7,
  12500,
  1161,
  'Jumeirah Bay Island',
  'Bulgari Resort',
  'Exclusive 6-bedroom villa within the Bulgari Resort community. Private yacht berth, beach access, Bulgari-designed interiors, and access to the resort''s Michelin-starred restaurants and luxury amenities.',
  ARRAY['Private Yacht Berth', 'Beach Access', 'Bulgari Interiors', 'Resort Amenities', 'Infinity Pool', 'Landscaped Gardens', 'Smart Home', 'Concierge'],
  'available',
  'Meraas',
  5.0,
  6.8,
  true,
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800'
  ],
  true
),

-- 5. Dubai Hills Estate Golf Mansion
(
  'Dubai Hills Estate - Golf Course Mansion',
  'dubai-hills-estate-golf-course-mansion',
  'villa',
  32000000,
  8710000,
  6,
  7,
  11000,
  1022,
  'Dubai Hills Estate',
  'Parkways',
  'Luxurious 6-bedroom mansion overlooking the championship golf course. Expansive outdoor living areas, infinity pool, home cinema, gym, and direct golf course access. Perfect for families seeking tranquility.',
  ARRAY['Golf Course Views', 'Infinity Pool', 'Home Cinema', 'Gym', 'Landscaped Garden', 'Smart Home', 'Maid''s Quarters', 'Private Garage'],
  'available',
  'Emaar Properties',
  5.8,
  7.5,
  true,
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
  ],
  false
),

-- 6. Off-Plan: Dubai Creek Harbour Waterfront
(
  'Dubai Creek Harbour - Waterfront Residences (Off-Plan)',
  'dubai-creek-harbour-waterfront-residences',
  'off-plan',
  6500000,
  1770000,
  3,
  4,
  2800,
  260,
  'Dubai Creek Harbour',
  'Creek Beach',
  'Modern 3-bedroom apartment in Dubai''s fastest-growing waterfront community. Stunning views of Dubai Creek Tower (under construction), private beach access, and 20/80 payment plan. Expected completion: Q4 2026.',
  ARRAY['Creek Tower Views', 'Beach Access', 'Smart Home', 'Balcony', 'Gym', 'Pool', 'Kids Play Area', 'Retail Podium'],
  'off-plan',
  'Emaar Properties',
  7.2,
  9.5,
  true,
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800'
  ],
  false,
  '2026-12-31',
  '20/80 Post-Handover'
),

-- 7. Business Bay Investment Apartment
(
  'Business Bay - Canal View Apartment',
  'business-bay-canal-view-apartment',
  'apartment',
  3200000,
  871000,
  2,
  3,
  1650,
  153,
  'Business Bay',
  'Canal District',
  'Prime investment opportunity: 2-bedroom apartment with Dubai Canal views. High rental demand, close to Downtown Dubai and DIFC. Perfect for investors seeking strong ROI and Golden Visa eligibility.',
  ARRAY['Canal Views', 'Balcony', 'Gym', 'Pool', 'Parking', 'Security', 'Retail Podium', 'Metro Access'],
  'available',
  'Omniyat',
  8.0,
  10.2,
  true,
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
  ],
  false
),

-- 8. Emirates Hills Mega Mansion
(
  'Emirates Hills - Ultra-Luxury Mega Mansion',
  'emirates-hills-ultra-luxury-mega-mansion',
  'villa',
  120000000,
  32670000,
  8,
  10,
  25000,
  2323,
  'Emirates Hills',
  'Lake View',
  'Dubai''s most exclusive address: 8-bedroom mega mansion with private lake, championship tennis court, indoor and outdoor pools, 12-car garage, helipad, and staff accommodations for 10+. Epitome of ultra-luxury living.',
  ARRAY['Private Lake', 'Tennis Court', 'Helipad', 'Indoor Pool', 'Outdoor Pool', 'Wine Cellar', 'Private Cinema', 'Spa', '12-Car Garage', 'Staff Quarters'],
  'available',
  'Private Developer',
  4.0,
  5.5,
  true,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
  ARRAY[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
  ],
  true
);
