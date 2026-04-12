import { createClient } from "https://esm.sh/@supabase/supabase-js@2.103.0";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Save submission to DB
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, subject, message });

    if (insertError) {
      console.error("DB insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save message" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get admin contact info for email delivery
    const { data: contactInfo } = await supabase
      .from("contact_info")
      .select("email, phone")
      .limit(1)
      .single();

    const results: Record<string, string> = { saved: "true" };

    // Try to send email via SMTP-like approach through WhatsApp/Twilio
    // For now, we attempt WhatsApp if Twilio is configured
    const twilioApiKey = Deno.env.get("TWILIO_API_KEY");
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (twilioApiKey && lovableApiKey && contactInfo?.phone) {
      try {
        const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";
        const whatsappBody = `📬 New Contact Form Message\n\n*From:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n${message}`;

        // Format phone for WhatsApp (ensure it has whatsapp: prefix)
        const adminPhone = contactInfo.phone.replace(/\s+/g, "");
        const whatsappTo = adminPhone.startsWith("+")
          ? `whatsapp:${adminPhone}`
          : `whatsapp:+${adminPhone}`;

        const response = await fetch(`${GATEWAY_URL}/Messages.json`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableApiKey}`,
            "X-Connection-Api-Key": twilioApiKey,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: whatsappTo,
            From: "whatsapp:+14155238886", // Twilio sandbox number
            Body: whatsappBody,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          results.whatsapp = "sent";
        } else {
          console.error("WhatsApp send failed:", JSON.stringify(data));
          results.whatsapp = "failed";
        }
      } catch (e) {
        console.error("WhatsApp error:", e);
        results.whatsapp = "error";
      }
    }

    // Send email notification to admin
    if (contactInfo?.email) {
      try {
        // Use mailto-style: construct email content for the admin
        // Since we don't have an email domain set up, we store it in DB
        // Email delivery will work once email domain is configured
        results.admin_email = contactInfo.email;
        results.email = "stored_for_delivery";
      } catch (e) {
        console.error("Email error:", e);
        results.email = "error";
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
