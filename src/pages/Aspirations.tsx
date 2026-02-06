import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aspirationsImage from "@/assets/aspirations-horizon.jpg";
import { Rocket, Briefcase, GraduationCap, Heart, Globe } from "lucide-react";
import { motion } from "framer-motion";

const goals = [
  {
    icon: GraduationCap,
    title: "Graduate with Honors",
    timeline: "2025",
    description:
      "Complete my B.S. in Computer Science with a GPA above 3.8, with a thesis focused on accessible AI interfaces.",
    status: "In Progress",
  },
  {
    icon: Briefcase,
    title: "Land a Role in Tech",
    timeline: "2025 – 2026",
    description:
      "Join a forward-thinking tech company as a software engineer, ideally working on products that make technology more accessible.",
    status: "Planning",
  },
  {
    icon: Rocket,
    title: "Build a Startup",
    timeline: "2027+",
    description:
      "Launch a startup focused on EdTech — creating tools that make quality education accessible to underserved communities worldwide.",
    status: "Dream",
  },
  {
    icon: GraduationCap,
    title: "Pursue a Master's Degree",
    timeline: "2028+",
    description:
      "Earn an M.S. in AI/ML from a top research university, deepening my expertise in machine learning and natural language processing.",
    status: "Future",
  },
  {
    icon: Heart,
    title: "Give Back to My Community",
    timeline: "Ongoing",
    description:
      "Mentor aspiring developers from underrepresented backgrounds, organize free coding workshops, and contribute to open-source education projects.",
    status: "Active",
  },
  {
    icon: Globe,
    title: "Travel & Learn",
    timeline: "Lifelong",
    description:
      "Explore different cultures, attend international tech conferences, and collaborate with developers from around the world.",
    status: "Ongoing",
  },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/15 text-primary",
  "Planning": "bg-accent text-accent-foreground",
  "Dream": "bg-amber-soft text-foreground",
  "Future": "bg-muted text-muted-foreground",
  "Active": "bg-sage-soft text-foreground",
  "Ongoing": "bg-muted text-muted-foreground",
};

const Aspirations = () => {
  return (
    <>
      <PageHero
        image={aspirationsImage}
        title="Future Aspirations"
        subtitle="Where I'm headed — the dreams, goals, and ambitions that fuel my journey forward."
        alt="Person looking towards a city sunrise from a hilltop"
      />

      {/* Vision Statement */}
      <section className="page-section">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">
              My Vision
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-8">
              Technology should empower everyone,{" "}
              <span className="text-primary">not just the privileged few.</span>
            </h2>
            <p className="body-text">
              I believe that the most impactful technology is the kind that lifts people up.
              Whether it's building accessible interfaces, creating educational tools, or
              mentoring the next generation of developers — I want my career to be defined
              by the positive change it creates.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Goals Grid */}
      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">
              Roadmap
            </p>
            <h2 className="section-title">Goals & Milestones</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {goals.map((goal, index) => (
              <AnimatedSection key={goal.title} delay={index * 0.1}>
                <motion.div
                  className="skill-card h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-accent rounded-xl p-3">
                      <goal.icon className="text-primary" size={24} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-body font-medium px-3 py-1 rounded-full ${statusColors[goal.status]}`}>
                        {goal.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-body mb-1">{goal.timeline}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {goal.title}
                  </h3>
                  <p className="body-text text-base">{goal.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="page-section text-center">
        <AnimatedSection>
          <blockquote className="font-display text-2xl md:text-4xl font-medium text-foreground italic max-w-3xl mx-auto leading-relaxed">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </blockquote>
          <p className="mt-6 text-muted-foreground font-body">— Chinese Proverb</p>
        </AnimatedSection>
      </section>
    </>
  );
};

export default Aspirations;
