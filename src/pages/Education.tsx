import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import educationImage from "@/assets/education-desk.jpg";
import { Award, BookOpen } from "lucide-react";
import { useEducationEntries, useEducationAchievements, useEducationActivities, useSiteImages } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";

const Education = () => {
  const { data: entries, isLoading } = useEducationEntries();
  const { data: achievements } = useEducationAchievements();
  const { data: activities } = useEducationActivities();
  const { data: images } = useSiteImages();

  if (isLoading) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-education");

  return (
    <>
      <PageHero image={heroImg?.url || educationImage} title="My Education" subtitle="Academic milestones, research, and the relentless pursuit of knowledge." alt={heroImg?.alt_text || "Study desk"} />

      <section className="page-section">
        <AnimatedSection>
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Academic Journey</p>
          <h2 className="section-title">Where I've Learned</h2>
        </AnimatedSection>
        <div className="space-y-8 mt-12">
          {entries?.map((edu, index) => {
            const Icon = getIcon(edu.icon_name);
            const highlights = Array.isArray(edu.highlights) ? edu.highlights as string[] : [];
            return (
              <AnimatedSection key={edu.id} delay={index * 0.15}>
                <div className="skill-card">
                  <div className="flex items-start gap-6">
                    <div className="bg-accent rounded-xl p-4 shrink-0"><Icon className="text-primary" size={28} /></div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-foreground">{edu.institution}</h3>
                          <p className="text-primary font-body font-medium">{edu.degree}</p>
                        </div>
                        <span className="text-sm text-muted-foreground font-body bg-muted px-3 py-1 rounded-full self-start">{edu.period}</span>
                      </div>
                      <ul className="space-y-2 mt-4">
                        {highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <Award size={16} className="text-primary mt-1 shrink-0" />
                            <span className="font-body">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="page-section">
          <AnimatedSection><h2 className="section-title text-center text-secondary-foreground">By the Numbers</h2></AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {achievements?.map((ach, index) => (
              <AnimatedSection key={ach.id} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-4xl md:text-5xl font-bold text-primary">{ach.count_value}</p>
                  <p className="font-display text-lg font-semibold mt-2 text-secondary-foreground">{ach.title}</p>
                  <p className="text-sm text-secondary-foreground/70 mt-1">{ach.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <AnimatedSection>
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Beyond the Classroom</p>
          <h2 className="section-title">Extracurricular Activities</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {activities?.map((activity, index) => (
            <AnimatedSection key={activity.id} delay={index * 0.1}>
              <div className="skill-card h-full">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={18} className="text-primary" />
                  <span className="text-sm font-body font-medium text-primary">{activity.role}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{activity.title}</h3>
                <p className="body-text text-base">{activity.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
};

export default Education;
