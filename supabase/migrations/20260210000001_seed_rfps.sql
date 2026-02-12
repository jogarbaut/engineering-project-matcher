-- Insert sample RFPs for testing (15 total to test preview limit)
INSERT INTO public.rfps (title, description, agency_name, due_date, estimated_value, location)
VALUES
  ('Highway Bridge Reconstruction', 'Design and construction of highway bridge replacement', 'Department of Transportation', '2026-03-15', 2500000, 'Los Angeles, CA'),
  ('Municipal Water Treatment Facility', 'Upgrade and expansion of water treatment infrastructure', 'City Water Authority', '2026-04-01', 5000000, 'Phoenix, AZ'),
  ('Solar Farm Installation', 'Design, procurement, and installation of 50MW solar farm', 'State Energy Commission', '2026-02-28', 15000000, 'Austin, TX'),
  ('Airport Terminal Expansion', 'Design and construction of new terminal building', 'Airport Authority', '2026-03-20', 75000000, 'Denver, CO'),
  ('Coastal Flood Protection', 'Seawall and drainage infrastructure improvements', 'City Engineering Dept', '2026-04-15', 12000000, 'Miami, FL'),
  ('School HVAC Modernization', 'Replace HVAC systems in 12 school buildings', 'School District', '2026-03-10', 3500000, 'Seattle, WA'),
  ('Downtown Parking Structure', 'Multi-level parking garage with EV charging', 'City Development', '2026-05-01', 18000000, 'Portland, OR'),
  ('Rail Transit Extension', 'Light rail extension design and construction', 'Transit Authority', '2026-06-01', 250000000, 'San Francisco, CA'),
  ('Wastewater Treatment Upgrade', 'Treatment plant expansion and modernization', 'Water District', '2026-04-20', 45000000, 'San Diego, CA'),
  ('Veterans Hospital Renovation', 'Modernization of medical facilities', 'Veterans Affairs', '2026-05-15', 32000000, 'Boston, MA'),
  ('Sports Complex Development', 'Multi-sport facility with indoor arena', 'Parks & Recreation', '2026-07-01', 28000000, 'Atlanta, GA'),
  ('Smart City Infrastructure', 'IoT sensors and traffic management system', 'City IT Department', '2026-03-25', 8500000, 'Austin, TX'),
  ('Historic Building Restoration', 'Preservation and seismic retrofit of courthouse', 'State Historic Office', '2026-06-15', 15500000, 'Sacramento, CA'),
  ('Industrial Park Development', 'Infrastructure for new industrial zone', 'Economic Development', '2026-08-01', 22000000, 'Charlotte, NC'),
  ('Regional Hospital Wing', 'New patient wing and emergency department', 'County Health Services', '2026-05-30', 65000000, 'Dallas, TX');
