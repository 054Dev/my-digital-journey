import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Palette, Rocket, Mail } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";
import AnimatedSection from "@/components/AnimatedSection";

const journeyLinks = [
  {
    to: "/childhood",
    icon: BookOpen,
    title: "Childhood",
    description: "Where it all began — family, adventures, and formative moments.",
  },
  {
    to: "/education",
    icon: BookOpen,
    title: "Education",
    description: "Academic milestones and the pursuit of knowledge.",
  },
  {
    to: "/skills",
    icon: Palette,
    title: "Skills & Talents",
    description: "Coding, creativity, and everything in between.",
  },
  {
    to: "/aspirations",
    icon: Rocket,
    title: "Future Aspirations",
    description: "Dreams and goals that drive me forward.",
  },
  {
    to: "/contact",
    icon: Mail,
    title: "Get in Touch",
    description: "Let's connect and create something together.",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="University campus at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-body text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Welcome to my journey
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Hi, I'm{" "}
              <span className="text-primary">Alex</span>
              <br />
              Rivera
            </h1>
            <p className="font-body text-xl md:text-2xl text-primary-foreground/80 max-w-xl leading-relaxed mb-10">
              A Computer Science student passionate about building the future,
              one line of code at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/childhood"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Explore My Story
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-lg hover:bg-primary-foreground/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Brief */}
      <section className="page-section">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">
                About Me
              </p>
              <h2 className="section-title">
                A story of curiosity,<br />growth & ambition
              </h2>
              <p className="body-text mb-6">
                Growing up in a small town, I developed an insatiable curiosity for how things work.
                From tinkering with gadgets in my backyard to writing my first program at age 14,
                every experience has shaped who I am today.
              </p>
              <p className="body-text">
                Now, as a junior at the University of Technology, I'm channeling that curiosity into
                a career in software engineering, while nurturing my love for photography, music,
                and community service.
              </p>
            </div>
            <div className="bg-accent rounded-2xl p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <p className="font-display text-4xl font-bold text-primary">21</p>
                  <p className="text-sm text-muted-foreground mt-1">Years of adventures</p>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="font-display text-4xl font-bold text-primary">3.8</p>
                  <p className="text-sm text-muted-foreground mt-1">Current GPA</p>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="font-display text-4xl font-bold text-primary">12+</p>
                  <p className="text-sm text-muted-foreground mt-1">Projects completed</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Journey Links */}
      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3 text-center">
              My Journey
            </p>
            <h2 className="section-title text-center">Explore My Life Chapters</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {journeyLinks.map((link, index) => (
              <AnimatedSection key={link.to} delay={index * 0.1}>
                <Link
                  to={link.to}
                  className="group skill-card flex flex-col h-full"
                >
                  <link.icon className="text-primary mb-4" size={28} />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {link.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight size={16} />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="page-section text-center">
        <AnimatedSection>
          <blockquote className="font-display text-2xl md:text-4xl font-medium text-foreground italic max-w-3xl mx-auto leading-relaxed">
            "The only way to do great work is to love what you do."
          </blockquote>
          <p className="mt-6 text-muted-foreground font-body">— Steve Jobs</p>
        </AnimatedSection>
      </section>
    </>
  );
};

export default Index;
