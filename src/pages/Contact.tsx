import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, MapPin, Send, CheckCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useSocialLinks, useContactInfo, useSiteSettings } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const Contact = () => {
  const { toast } = useToast();
  const { data: socialLinks, isLoading } = useSocialLinks();
  const { data: contact } = useContactInfo();
  const { data: settings } = useSiteSettings();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) return <PageSkeleton />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    toast({ title: "Message sent!", description: "Thank you for reaching out." });
  };

  const statusColor = contact?.availability_status === "available" ? "bg-sage" : contact?.availability_status === "busy" ? "bg-amber" : "bg-destructive";

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="page-section pt-24 md:pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Let's Connect</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight mb-6">Get in Touch</h1>
            <p className="text-xl text-secondary-foreground/80 font-body">Whether it's a project idea, collaboration opportunity, or just a friendly hello — I'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <AnimatedSection>
              <h2 className="section-title">Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-accent rounded-2xl p-12 text-center">
                  <CheckCircle className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Thank You!</h3>
                  <p className="body-text">Your message has been received.</p>
                  <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }} className="mt-6 text-primary font-body font-medium hover:underline">Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-body font-medium text-foreground mb-2">Name</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Your name" />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">Email</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="you@example.com" />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-body font-medium text-foreground mb-2">Subject</label>
                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="What's this about?" />
                    {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-body font-medium text-foreground mb-2">Message</label>
                    <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none" placeholder="Your message..." />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-lg hover:bg-primary/90 transition-colors">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          <div className="md:col-span-2">
            <AnimatedSection delay={0.2}>
              <h2 className="section-title">Contact Info</h2>
              <div className="space-y-6 mb-10">
                {contact?.email && (
                  <div className="flex items-start gap-4">
                    <div className="bg-accent rounded-xl p-3 shrink-0"><Mail className="text-primary" size={20} /></div>
                    <div>
                      <p className="font-body font-medium text-foreground">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">{contact.email}</a>
                    </div>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-start gap-4">
                    <div className="bg-accent rounded-xl p-3 shrink-0"><Phone className="text-primary" size={20} /></div>
                    <div>
                      <p className="font-body font-medium text-foreground">Phone</p>
                      <a href={`tel:${contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{contact.phone}</a>
                    </div>
                  </div>
                )}
                {contact?.location && (
                  <div className="flex items-start gap-4">
                    <div className="bg-accent rounded-xl p-3 shrink-0"><MapPin className="text-primary" size={20} /></div>
                    <div>
                      <p className="font-body font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">{contact.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-4">Find Me Online</h3>
              <div className="space-y-4">
                {socialLinks?.map(social => {
                  const Icon = getIcon(social.icon_name);
                  return (
                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="bg-accent rounded-xl p-3 group-hover:bg-primary/10 transition-colors"><Icon className="text-primary" size={20} /></div>
                      <div>
                        <p className="font-body font-medium text-foreground group-hover:text-primary transition-colors">{social.platform}</p>
                        <p className="text-sm text-muted-foreground">{social.handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-10 bg-accent rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${statusColor}`} />
                  <span className="font-body text-sm font-medium text-foreground">
                    {contact?.availability_status === "available" ? "Available for opportunities" : contact?.availability_status === "busy" ? "Currently busy" : "Not available"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{contact?.availability_text || ""}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
