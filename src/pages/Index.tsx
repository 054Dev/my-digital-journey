import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Palette, Rocket, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { usePageSEO } from "@/hooks/usePageSEO";

const journeyLinks = [
  { to: "/childhood", icon: BookOpen, title: "Childhood", description: "Where it all began — family, adventures, and formative moments." },
  { to: "/education", icon: BookOpen, title: "Education", description: "Academic milestones and the pursuit of knowledge." },
  { to: "/skills", icon: Palette, title: "Skills & Talents", description: "Coding, creativity, and everything in between." },
  { to: "/aspirations", icon: Rocket, title: "Future Aspirations", description: "Dreams and goals that drive me forward." },
  { to: "/contact", icon: Mail, title: "Get in Touch", description: "Let's connect and create something together." },
];

const Index = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const { data: images } = useSiteImages();

  usePageSEO({
    title: settings?.full_name ? `${settings.full_name} — Personal Portfolio` : undefined,
    description: settings?.bio_short || "Personal portfolio showcasing life journey, skills, and aspirations.",
  });

  if (isLoading) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-home");
  const s = settings;

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {heroImg?.url && (
          <img
            src={heroImg.url}
            alt={`${s?.full_name || "Portfolio"} hero`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <p className="font-body text-primary uppercase tracking-[0.3em] text-sm mb-4">Welcome to my journey</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6">
              {s?.first_name && (
                <>Hi, I'm{" "}<span className="text-primary">{s.first_name}</span><br /></>
              )}
              {s?.full_name?.split(" ").slice(1).join(" ")}
            </h1>
            <p className="font-body text-xl md:text-2xl text-primary-foreground/80 max-w-xl leading-relaxed mb-10">
              {s?.bio_short || ""}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/childhood" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-lg hover:bg-primary/90 transition-colors">
                Explore My Story <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-lg hover:bg-primary-foreground/10 transition-colors">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-section">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">About Me</p>
              <h2 className="section-title">{s?.about_heading || ""}</h2>
              <p className="body-text mb-6">{s?.about_text_1 || ""}</p>
              <p className="body-text">{s?.about_text_2 || ""}</p>
            </div>
            <div className="bg-accent rounded-2xl p-8 md:p-12">
              <div className="space-y-6">
                {s?.stat_1_value && (
                  <div>
                    <p className="font-display text-4xl font-bold text-primary">{s.stat_1_value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.stat_1_label}</p>
                  </div>
                )}
                {s?.stat_2_value && (
                  <div className="border-t border-border pt-6">
                    <p className="font-display text-4xl font-bold text-primary">{s.stat_2_value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.stat_2_label}</p>
                  </div>
                )}
                {s?.stat_3_value && (
                  <div className="border-t border-border pt-6">
                    <p className="font-display text-4xl font-bold text-primary">{s.stat_3_value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.stat_3_label}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3 text-center">My Journey</p>
            <h2 className="section-title text-center">Explore My Life Chapters</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {journeyLinks.map((link, index) => (
              <AnimatedSection key={link.to} delay={index * 0.1}>
                <Link to={link.to} className="group skill-card flex flex-col h-full">
                  <link.icon className="text-primary mb-4" size={28} />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{link.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Read more <ArrowRight size={16} /></div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {s?.quote_text && (
        <section
          className="page-section text-center relative"
          style={{
            backgroundImage: images?.find(i => i.image_key === "bg-quote-home")?.url
              ? `url(${images.find(i => i.image_key === "bg-quote-home")?.url})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {images?.find(i => i.image_key === "bg-quote-home")?.url && (
            <div className="absolute inset-0 bg-background/80" />
          )}
          <AnimatedSection>
            <div className="relative z-10">
              <blockquote className="font-display text-2xl md:text-4xl font-medium text-foreground italic max-w-3xl mx-auto leading-relaxed">
                "{s.quote_text}"
              </blockquote>
              {s.quote_author && <p className="mt-6 text-muted-foreground font-body">— {s.quote_author}</p>}
            </div>
          </AnimatedSection>
        </section>
      )}
    </>
  );
};

export default Index;
