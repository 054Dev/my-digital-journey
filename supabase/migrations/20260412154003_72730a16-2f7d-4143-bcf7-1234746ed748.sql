
-- Contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Auth can read submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Auth can manage submissions"
  ON public.contact_submissions FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "Auth can delete submissions"
  ON public.contact_submissions FOR DELETE
  TO authenticated USING (true);

-- Image versions table for history/gallery
CREATE TABLE public.image_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_key TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.image_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read image_versions"
  ON public.image_versions FOR SELECT
  USING (true);

CREATE POLICY "Auth manage image_versions"
  ON public.image_versions FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Theme settings table
CREATE TABLE public.theme_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_color TEXT NOT NULL DEFAULT '30 80% 52%',
  background_color TEXT NOT NULL DEFAULT '40 33% 96%',
  foreground_color TEXT NOT NULL DEFAULT '220 20% 14%',
  accent_color TEXT NOT NULL DEFAULT '30 60% 88%',
  secondary_color TEXT NOT NULL DEFAULT '220 15% 22%',
  heading_color TEXT NOT NULL DEFAULT '220 20% 14%',
  text_color TEXT NOT NULL DEFAULT '220 10% 46%',
  font_display TEXT NOT NULL DEFAULT 'Playfair Display',
  font_body TEXT NOT NULL DEFAULT 'Source Sans 3',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read theme_settings"
  ON public.theme_settings FOR SELECT
  USING (true);

CREATE POLICY "Auth manage theme_settings"
  ON public.theme_settings FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Seed default theme settings
INSERT INTO public.theme_settings (id) VALUES (gen_random_uuid());

-- Add trigger for updated_at
CREATE TRIGGER update_theme_settings_updated_at
  BEFORE UPDATE ON public.theme_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
