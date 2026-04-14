import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

function parseHSL(hsl: string) {
  const parts = hsl.trim().split(/\s+/);
  return {
    h: parseFloat(parts[0]) || 0,
    s: parseFloat(parts[1]) || 0,
    l: parseFloat(parts[2]) || 0,
  };
}

function hsl(h: number, s: number, l: number) {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
}

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
    const isDark = root.classList.contains("dark");

    const bg = parseHSL(t.background_color);
    const primary = parseHSL(t.primary_color);

    // Apply to both light root variables - dark mode uses its own CSS defaults
    // Only override light mode; dark mode variables are handled by the .dark class in CSS
    if (!isDark) {
      root.style.setProperty("--primary", t.primary_color);
      root.style.setProperty("--primary-foreground", t.background_color);
      root.style.setProperty("--background", t.background_color);
      root.style.setProperty("--foreground", t.foreground_color);
      root.style.setProperty("--card", hsl(bg.h, Math.max(bg.s - 3, 0), Math.min(bg.l + 2, 100)));
      root.style.setProperty("--card-foreground", t.foreground_color);
      root.style.setProperty("--popover", hsl(bg.h, Math.max(bg.s - 3, 0), Math.min(bg.l + 2, 100)));
      root.style.setProperty("--popover-foreground", t.foreground_color);
      root.style.setProperty("--secondary", t.secondary_color);
      root.style.setProperty("--secondary-foreground", t.background_color);
      root.style.setProperty("--muted", hsl(bg.h, Math.max(bg.s - 13, 0), Math.max(bg.l - 6, 0)));
      root.style.setProperty("--muted-foreground", t.text_color);
      root.style.setProperty("--accent", t.accent_color);
      root.style.setProperty("--accent-foreground", t.foreground_color);
      root.style.setProperty("--border", hsl(bg.h, Math.max(bg.s - 13, 0), Math.max(bg.l - 10, 0)));
      root.style.setProperty("--input", hsl(bg.h, Math.max(bg.s - 13, 0), Math.max(bg.l - 10, 0)));
      root.style.setProperty("--ring", t.primary_color);
      root.style.setProperty("--ink", t.heading_color);
      root.style.setProperty("--warm-cream", t.background_color);
      root.style.setProperty("--warm-cream-dark", hsl(bg.h, Math.max(bg.s - 8, 0), Math.max(bg.l - 4, 0)));
      root.style.setProperty("--sidebar-background", hsl(bg.h, Math.max(bg.s - 3, 0), Math.min(bg.l + 2, 100)));
      root.style.setProperty("--sidebar-foreground", t.foreground_color);
      root.style.setProperty("--sidebar-primary", t.primary_color);
      root.style.setProperty("--sidebar-primary-foreground", t.background_color);
      root.style.setProperty("--sidebar-accent", hsl(bg.h, Math.max(bg.s - 13, 0), Math.max(bg.l - 6, 0)));
      root.style.setProperty("--sidebar-accent-foreground", t.foreground_color);
      root.style.setProperty("--sidebar-border", hsl(bg.h, Math.max(bg.s - 13, 0), Math.max(bg.l - 10, 0)));
      root.style.setProperty("--sidebar-ring", t.primary_color);
    }

    // Neon variants based on primary
    root.style.setProperty("--neon-blue", t.primary_color);
    root.style.setProperty("--neon-cyan", hsl(primary.h - 25, 100, Math.min(primary.l + 5, 60)));

    // Fonts
    if (t.font_display) {
      root.style.setProperty("--font-display", `'${t.font_display}', system-ui, sans-serif`);
    }
    if (t.font_body) {
      root.style.setProperty("--font-body", `'${t.font_body}', system-ui, sans-serif`);
    }

    // Load Google Fonts dynamically
    const fonts = [t.font_display, t.font_body].filter(Boolean);
    const existingLink = document.getElementById("dynamic-google-fonts") as HTMLLinkElement;
    const fontFamilies = fonts.map(f => f.replace(/\s+/g, "+") + ":wght@300;400;500;600;700;800").join("&family=");
    const href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
    if (existingLink) {
      existingLink.href = href;
    } else {
      const link = document.createElement("link");
      link.id = "dynamic-google-fonts";
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, [query.data]);

  return query;
};
