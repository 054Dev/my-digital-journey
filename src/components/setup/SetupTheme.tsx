import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Save, Palette, RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FONT_OPTIONS = [
  "Playfair Display",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Merriweather",
  "Source Sans 3",
  "Nunito",
  "PT Serif",
  "Lora",
  "Crimson Text",
  "DM Sans",
];

const DEFAULT_THEME = {
  primary_color: "30 80% 52%",
  background_color: "40 33% 96%",
  foreground_color: "220 20% 14%",
  accent_color: "30 60% 88%",
  secondary_color: "220 15% 22%",
  heading_color: "220 20% 14%",
  text_color: "220 10% 46%",
  font_display: "Playfair Display",
  font_body: "Source Sans 3",
};

function hslToHex(hsl: string): string {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3) return "#cc7722";
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0% 0%";
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const ColorField = ({ label, value, onChange }: ColorFieldProps) => (
  <div className="flex items-center gap-3">
    <input
      type="color"
      value={hslToHex(value)}
      onChange={(e) => onChange(hexToHsl(e.target.value))}
      className="w-10 h-10 rounded-lg border border-input cursor-pointer"
    />
    <div className="flex-1">
      <Label className="text-sm">{label}</Label>
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
  </div>
);

const SetupTheme = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: theme, isLoading } = useQuery({
    queryKey: ["theme_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("theme_settings").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState(DEFAULT_THEME);

  useEffect(() => {
    if (theme) {
      setForm({
        primary_color: theme.primary_color,
        background_color: theme.background_color,
        foreground_color: theme.foreground_color,
        accent_color: theme.accent_color,
        secondary_color: theme.secondary_color,
        heading_color: theme.heading_color,
        text_color: theme.text_color,
        font_display: theme.font_display,
        font_body: theme.font_body,
      });
    }
  }, [theme]);

  const save = async () => {
    if (!theme) return;
    const { error } = await supabase
      .from("theme_settings")
      .update(form as any)
      .eq("id", theme.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Theme saved!" });
      qc.invalidateQueries({ queryKey: ["theme_settings"] });
    }
  };

  const resetDefaults = () => {
    setForm(DEFAULT_THEME);
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Palette className="text-primary" size={24} />
        <h2 className="font-display text-2xl font-semibold">Theme Customization</h2>
      </div>
      <p className="text-muted-foreground">Adjust colors and fonts to personalize your site's appearance.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Colors</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <ColorField label="Primary / Accent Color" value={form.primary_color} onChange={(v) => setForm({ ...form, primary_color: v })} />
            <ColorField label="Background" value={form.background_color} onChange={(v) => setForm({ ...form, background_color: v })} />
            <ColorField label="Foreground / Text Dark" value={form.foreground_color} onChange={(v) => setForm({ ...form, foreground_color: v })} />
            <ColorField label="Accent / Highlight" value={form.accent_color} onChange={(v) => setForm({ ...form, accent_color: v })} />
            <ColorField label="Secondary (Nav/Hero BG)" value={form.secondary_color} onChange={(v) => setForm({ ...form, secondary_color: v })} />
            <ColorField label="Heading Color" value={form.heading_color} onChange={(v) => setForm({ ...form, heading_color: v })} />
            <ColorField label="Body Text Color" value={form.text_color} onChange={(v) => setForm({ ...form, text_color: v })} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Fonts</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Display / Heading Font</Label>
                <Select value={form.font_display} onValueChange={(v) => setForm({ ...form, font_display: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Body Font</Label>
                <Select value={form.font_body} onValueChange={(v) => setForm({ ...form, font_body: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Preview</CardTitle></CardHeader>
            <CardContent>
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: `hsl(${form.background_color})`,
                  color: `hsl(${form.foreground_color})`,
                }}
              >
                <h3
                  style={{
                    fontFamily: `'${form.font_display}', serif`,
                    color: `hsl(${form.heading_color})`,
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Sample Heading
                </h3>
                <p
                  style={{
                    fontFamily: `'${form.font_body}', sans-serif`,
                    color: `hsl(${form.text_color})`,
                    marginBottom: "1rem",
                  }}
                >
                  This is how your body text will look with the selected theme.
                </p>
                <button
                  style={{
                    backgroundColor: `hsl(${form.primary_color})`,
                    color: `hsl(${form.background_color})`,
                    padding: "0.5rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontFamily: `'${form.font_body}', sans-serif`,
                    fontWeight: 600,
                  }}
                >
                  Sample Button
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={save} size="lg">
          <Save size={18} /> Save Theme
        </Button>
        <Button onClick={resetDefaults} variant="outline" size="lg">
          <RotateCcw size={18} /> Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default SetupTheme;
