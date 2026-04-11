import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useContactInfo } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SetupContact = () => {
  const { data: contact, isLoading } = useContactInfo();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contact) {
      const f: Record<string, string> = {};
      Object.entries(contact).forEach(([k, v]) => { if (typeof v === "string") f[k] = v; });
      setForm(f);
    }
  }, [contact]);

  const save = async () => {
    if (!contact) return;
    const updateData = { ...form };
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.updated_at;
    const { error } = await supabase.from("contact_info").update(updateData as any).eq("id", contact.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved!" }); qc.invalidateQueries({ queryKey: ["contact_info"] }); }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <Card>
      <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Email</Label><Input value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
          <div><Label>Phone</Label><Input value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1" /></div>
        </div>
        <div><Label>Location</Label><Input value={form.location || ""} onChange={e => setForm({ ...form, location: e.target.value })} className="mt-1" /></div>
        <div>
          <Label>Availability Status</Label>
          <Select value={form.availability_status || "available"} onValueChange={v => setForm({ ...form, availability_status: v })}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="not-available">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div><Label>Availability Text</Label><Textarea value={form.availability_text || ""} onChange={e => setForm({ ...form, availability_text: e.target.value })} className="mt-1" /></div>
        <Button onClick={save} size="lg"><Save size={18} /> Save Contact Info</Button>
      </CardContent>
    </Card>
  );
};

export default SetupContact;
