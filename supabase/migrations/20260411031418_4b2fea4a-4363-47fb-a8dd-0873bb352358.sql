-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Site Settings (single row)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT 'Alex Rivera',
  first_name TEXT NOT NULL DEFAULT 'Alex',
  tagline TEXT NOT NULL DEFAULT 'Computer Science Student • Dreamer • Creator',
  bio_short TEXT DEFAULT 'A Computer Science student passionate about building the future, one line of code at a time.',
  bio_long TEXT DEFAULT '',
  location TEXT DEFAULT 'Portland, Oregon, USA',
  employment_status TEXT DEFAULT 'Student',
  current_status TEXT DEFAULT 'Available for opportunities',
  about_heading TEXT DEFAULT 'A story of curiosity, growth & ambition',
  about_text_1 TEXT DEFAULT '',
  about_text_2 TEXT DEFAULT '',
  stat_1_value TEXT DEFAULT '21',
  stat_1_label TEXT DEFAULT 'Years of adventures',
  stat_2_value TEXT DEFAULT '3.8',
  stat_2_label TEXT DEFAULT 'Current GPA',
  stat_3_value TEXT DEFAULT '12+',
  stat_3_label TEXT DEFAULT 'Projects completed',
  quote_text TEXT DEFAULT 'The only way to do great work is to love what you do.',
  quote_author TEXT DEFAULT 'Steve Jobs',
  family_text TEXT DEFAULT '',
  value_1 TEXT DEFAULT 'Curiosity',
  value_1_sub TEXT DEFAULT 'Always asking "why?"',
  value_2 TEXT DEFAULT 'Resilience',
  value_2_sub TEXT DEFAULT 'Growing through change',
  value_3 TEXT DEFAULT 'Kindness',
  value_3_sub TEXT DEFAULT 'Putting others first',
  vision_title TEXT DEFAULT 'Technology should empower everyone, not just the privileged few.',
  vision_text TEXT DEFAULT '',
  aspirations_quote TEXT DEFAULT 'The best time to plant a tree was 20 years ago. The second best time is now.',
  aspirations_quote_author TEXT DEFAULT 'Chinese Proverb',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Auth update site_settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth insert site_settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE TRIGGER update_site_settings_ts BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Social Links
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Globe',
  handle TEXT DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social_links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Auth manage social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_social_links_ts BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  tech_stack TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  github_link TEXT DEFAULT '',
  live_demo_link TEXT DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Auth manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_projects_ts BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Technical Skills
CREATE TABLE public.skills_technical (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INT NOT NULL DEFAULT 50,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.skills_technical ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills_technical" ON public.skills_technical FOR SELECT USING (true);
CREATE POLICY "Auth manage skills_technical" ON public.skills_technical FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Creative Skills
CREATE TABLE public.skills_creative (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Star',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.skills_creative ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills_creative" ON public.skills_creative FOR SELECT USING (true);
CREATE POLICY "Auth manage skills_creative" ON public.skills_creative FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Education Entries
CREATE TABLE public.education_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  period TEXT NOT NULL,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  icon_name TEXT NOT NULL DEFAULT 'GraduationCap',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.education_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education_entries" ON public.education_entries FOR SELECT USING (true);
CREATE POLICY "Auth manage education_entries" ON public.education_entries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_education_entries_ts BEFORE UPDATE ON public.education_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Education Achievements
CREATE TABLE public.education_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  count_value TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.education_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education_achievements" ON public.education_achievements FOR SELECT USING (true);
CREATE POLICY "Auth manage education_achievements" ON public.education_achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Education Activities
CREATE TABLE public.education_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.education_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education_activities" ON public.education_activities FOR SELECT USING (true);
CREATE POLICY "Auth manage education_activities" ON public.education_activities FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Childhood Events
CREATE TABLE public.childhood_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Star',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.childhood_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read childhood_events" ON public.childhood_events FOR SELECT USING (true);
CREATE POLICY "Auth manage childhood_events" ON public.childhood_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_childhood_events_ts BEFORE UPDATE ON public.childhood_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Aspirations
CREATE TABLE public.aspirations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  timeline TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL DEFAULT 'Rocket',
  status TEXT NOT NULL DEFAULT 'Planning',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.aspirations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read aspirations" ON public.aspirations FOR SELECT USING (true);
CREATE POLICY "Auth manage aspirations" ON public.aspirations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_aspirations_ts BEFORE UPDATE ON public.aspirations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Contact Info
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  location TEXT DEFAULT '',
  availability_status TEXT DEFAULT 'available',
  availability_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact_info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Auth manage contact_info" ON public.contact_info FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_contact_info_ts BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Site Images
CREATE TABLE public.site_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL DEFAULT '',
  alt_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_images" ON public.site_images FOR SELECT USING (true);
CREATE POLICY "Auth manage site_images" ON public.site_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_site_images_ts BEFORE UPDATE ON public.site_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Resume Files
CREATE TABLE public.resume_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_type TEXT NOT NULL CHECK (file_type IN ('resume', 'cv')),
  file_url TEXT NOT NULL DEFAULT '',
  file_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.resume_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read resume_files" ON public.resume_files FOR SELECT USING (true);
CREATE POLICY "Auth manage resume_files" ON public.resume_files FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER update_resume_files_ts BEFORE UPDATE ON public.resume_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('resume-files', 'resume-files', true);

-- Storage policies
CREATE POLICY "Public read portfolio images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Auth upload portfolio images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-images');
CREATE POLICY "Auth update portfolio images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-images');
CREATE POLICY "Auth delete portfolio images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-images');

CREATE POLICY "Public read resume files" ON storage.objects FOR SELECT USING (bucket_id = 'resume-files');
CREATE POLICY "Auth upload resume files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'resume-files');
CREATE POLICY "Auth update resume files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'resume-files');
CREATE POLICY "Auth delete resume files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'resume-files');

-- Seed default data
INSERT INTO public.site_settings (
  full_name, first_name, tagline, bio_short, location, employment_status, current_status,
  about_heading, about_text_1, about_text_2, family_text, vision_text
) VALUES (
  'Alex Rivera', 'Alex', 'Computer Science Student • Dreamer • Creator',
  'A Computer Science student passionate about building the future, one line of code at a time.',
  'Portland, Oregon, USA', 'Student', 'Available for opportunities',
  'A story of curiosity, growth & ambition',
  'Growing up in a small town, I developed an insatiable curiosity for how things work. From tinkering with gadgets in my backyard to writing my first program at age 14, every experience has shaped who I am today.',
  'Now, as a junior at the University of Technology, I''m channeling that curiosity into a career in software engineering, while nurturing my love for photography, music, and community service.',
  'My parents, Maria and David Rivera, instilled in me the values of hard work, kindness, and lifelong learning. My older sister, Sofia, has always been my biggest cheerleader and friendly rival.',
  'I believe that the most impactful technology is the kind that lifts people up. Whether it''s building accessible interfaces, creating educational tools, or mentoring the next generation of developers — I want my career to be defined by the positive change it creates.'
);

INSERT INTO public.contact_info (email, phone, location, availability_status, availability_text)
VALUES ('alex.rivera@university.edu', '', 'Portland, Oregon, USA', 'available', 'I''m currently looking for internships and freelance projects. Feel free to reach out!');

INSERT INTO public.social_links (platform, url, icon_name, handle, display_order) VALUES
('GitHub', 'https://github.com/alexrivera', 'Github', '@alexrivera', 0),
('LinkedIn', 'https://linkedin.com/in/alexrivera', 'Linkedin', 'Alex Rivera', 1),
('Twitter', 'https://twitter.com/alexrivera', 'Twitter', '@alexrivera', 2);

INSERT INTO public.projects (title, description, tech_stack, display_order) VALUES
('EcoTrack App', 'A mobile app helping users track their carbon footprint with personalized sustainability tips.', 'React Native • Node.js • MongoDB', 0),
('StudyBuddy Platform', 'Real-time collaborative study platform connecting students for virtual study sessions.', 'Next.js • PostgreSQL • WebRTC', 1),
('AI Poetry Generator', 'An NLP project that generates poetry in the style of famous poets using fine-tuned language models.', 'Python • TensorFlow • Flask', 2);

INSERT INTO public.skills_technical (name, level, display_order) VALUES
('JavaScript / TypeScript', 90, 0), ('React & Next.js', 85, 1), ('Python', 80, 2),
('Node.js & Express', 75, 3), ('SQL & Database Design', 70, 4), ('Git & DevOps', 72, 5);

INSERT INTO public.skills_creative (title, description, icon_name, display_order) VALUES
('Photography', 'Landscape and street photography. My work has been featured in the university magazine and local exhibitions.', 'Camera', 0),
('Guitar & Music', 'Self-taught guitarist for 6 years. I play acoustic, perform at open mics, and compose my own pieces.', 'Music', 1),
('Digital Art', 'Creating illustrations and UI mockups using Figma, Procreate, and Adobe Creative Suite.', 'Paintbrush', 2),
('Languages', 'Fluent in English and Spanish. Currently learning Japanese through self-study and conversation groups.', 'Globe', 3);

INSERT INTO public.education_entries (period, institution, degree, highlights, icon_name, display_order) VALUES
('2019 – 2023', 'Lincoln High School', 'High School Diploma — Honors', '["Graduated in the top 10% of the class", "President of the Computer Science Club", "Won 1st place at State Science Fair (Robotics category)", "Varsity debate team member"]'::jsonb, 'GraduationCap', 0),
('2023 – Present', 'University of Technology', 'B.S. Computer Science — Junior Year', '["Dean''s List for 4 consecutive semesters", "Undergraduate Research Assistant — AI Lab", "Teaching Assistant for Intro to Programming", "Member of ACM Student Chapter"]'::jsonb, 'Code', 1);

INSERT INTO public.education_achievements (title, count_value, description, display_order) VALUES
('Dean''s List', '4x', 'Consecutive semesters', 0), ('GPA', '3.8', 'Cumulative GPA', 1),
('Research Papers', '2', 'Published / co-authored', 2), ('Hackathons Won', '3', 'Regional & national', 3);

INSERT INTO public.education_activities (title, role, description, display_order) VALUES
('ACM Student Chapter', 'Vice President', 'Organizing coding workshops, tech talks, and hackathon prep sessions for 100+ members.', 0),
('Open Source Contributor', 'Active Contributor', 'Contributing to React-based open source projects, focusing on accessibility improvements.', 1),
('Peer Tutoring Program', 'Lead Tutor', 'Helping underclassmen with data structures, algorithms, and web development concepts.', 2),
('Hackathon Team', 'Team Lead', 'Led a team of 4 to build innovative solutions at regional and national hackathons.', 3);

INSERT INTO public.childhood_events (year, title, description, icon_name, display_order) VALUES
('2005', 'First Adventures', 'Growing up in a cozy neighborhood in Portland, Oregon, my earliest memories are of building blanket forts with my sister and exploring the creek behind our house.', 'TreePine', 0),
('2008', 'The Curious Tinkerer', 'I took apart my first radio at age 7 — much to my parents'' dismay! But that spark of curiosity about how things work would define my path forward.', 'Star', 1),
('2010', 'Family Road Trips', 'Summer road trips with the family became a treasured tradition. From the Grand Canyon to Yellowstone, these journeys taught me to appreciate the vastness of the world.', 'Users', 2),
('2012', 'Discovering My Passion', 'At age 11, I attended a coding workshop at the local library. Writing my first Hello World program felt like magic.', 'Heart', 3),
('2014', 'Growing Through Challenges', 'Moving to a new city taught me resilience. Making new friends, adapting to a bigger school, and joining the robotics club helped me grow.', 'Star', 4);

INSERT INTO public.aspirations (title, description, timeline, icon_name, status, display_order) VALUES
('Graduate with Honors', 'Complete my B.S. in Computer Science with a GPA above 3.8, with a thesis focused on accessible AI interfaces.', '2025', 'GraduationCap', 'In Progress', 0),
('Land a Role in Tech', 'Join a forward-thinking tech company as a software engineer, ideally working on products that make technology more accessible.', '2025 – 2026', 'Briefcase', 'Planning', 1),
('Build a Startup', 'Launch a startup focused on EdTech — creating tools that make quality education accessible to underserved communities worldwide.', '2027+', 'Rocket', 'Dream', 2),
('Pursue a Master''s Degree', 'Earn an M.S. in AI/ML from a top research university, deepening my expertise in machine learning and natural language processing.', '2028+', 'GraduationCap', 'Future', 3),
('Give Back to My Community', 'Mentor aspiring developers from underrepresented backgrounds, organize free coding workshops, and contribute to open-source education projects.', 'Ongoing', 'Heart', 'Active', 4),
('Travel & Learn', 'Explore different cultures, attend international tech conferences, and collaborate with developers from around the world.', 'Lifelong', 'Globe', 'Ongoing', 5);

INSERT INTO public.site_images (image_key, url, alt_text) VALUES
('hero-home', '', 'University campus at golden hour'),
('hero-childhood', '', 'Nostalgic childhood backyard scene'),
('hero-education', '', 'Study desk with books and laptop'),
('hero-skills', '', 'Creative workspace'),
('hero-aspirations', '', 'Person looking towards sunrise'),
('favicon', '', 'Site favicon');