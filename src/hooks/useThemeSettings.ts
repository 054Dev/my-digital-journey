import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const useThemeSettings = () => {
  const query = useQuery({
    queryKey: ["theme_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("theme_settings")
        .select("*")
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!query.data) return;
    const t = query.data;
    const root = document.documentElement;
    root.style.setProperty("--primary", t.primary_color);
    root.style.setProperty("--background", t.background_color);
    root.style.setProperty("--foreground", t.foreground_color);
    root.style.setProperty("--accent", t.accent_color);
    root.style.setProperty("--secondary", t.secondary_color);
    root.style.setProperty("--ink", t.heading_color);
    root.style.setProperty("--muted-foreground", t.text_color);

    if (t.font_display) {
      root.style.setProperty("--font-display", `'${t.font_display}', Georgia, serif`);
    }
    if (t.font_body) {
      root.style.setProperty("--font-body", `'${t.font_body}', system-ui, sans-serif`);
    }
  }, [query.data]);

  return query;
};
