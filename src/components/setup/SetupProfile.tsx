import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";

const SetupProfile = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      const s: Record<string, string> = {};
      Object.entries(settings).forEach(([k, v]) => { if (typeof v === "string") s[k] = v; });
      setForm(s);
    }
  }, [settings]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const updateData: Record<string, string> = { ...form };
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.updated_at;
    const { error } = await supabase.from("site_settings").update(updateData as any).eq("id", settings.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Saved!", description: "Profile settings updated." });
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
    }
    setSaving(false);
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const field = (key: string, label: string, textarea = false) => (
    <div key={key}>
      <Label>{label}</Label>
      {textarea ? (
        <Textarea value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1" />
      ) : (
        <Input value={form[key] || ""} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1" />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {field("full_name", "Full Name")}
            {field("first_name", "First Name (hero greeting)")}
          </div>
          {field("tagline", "Tagline")}
          {field("bio_short", "Short Bio (hero description)", true)}
          <div className="grid sm:grid-cols-2 gap-4">
            {field("location", "Location")}
            {field("employment_status", "Employment Status")}
          </div>
          {field("current_status", "Current Status")}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>About Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {field("about_heading", "About Heading")}
          {field("about_text_1", "About Paragraph 1", true)}
          {field("about_text_2", "About Paragraph 2", true)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {field("stat_1_value", "Stat 1 Value")}
            {field("stat_1_label", "Stat 1 Label")}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field("stat_2_value", "Stat 2 Value")}
            {field("stat_2_label", "Stat 2 Label")}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field("stat_3_value", "Stat 3 Value")}
            {field("stat_3_label", "Stat 3 Label")}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Quotes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {field("quote_text", "Homepage Quote")}
            {field("quote_author", "Quote Author")}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field("aspirations_quote", "Aspirations Quote")}
            {field("aspirations_quote_author", "Quote Author")}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Family & Values (Childhood Page)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {field("family_text", "Family Section Text", true)}
          <div className="grid sm:grid-cols-2 gap-4">
            {field("value_1", "Value 1")}
            {field("value_1_sub", "Value 1 Subtitle")}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field("value_2", "Value 2")}
            {field("value_2_sub", "Value 2 Subtitle")}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field("value_3", "Value 3")}
            {field("value_3_sub", "Value 3 Subtitle")}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Vision (Aspirations Page)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {field("vision_title", "Vision Title")}
          {field("vision_text", "Vision Description", true)}
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        <Save size={18} /> {saving ? "Saving..." : "Save All Settings"}
      </Button>
    </div>
  );
};

export default SetupProfile;
