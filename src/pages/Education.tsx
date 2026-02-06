import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import educationImage from "@/assets/education-desk.jpg";
import { GraduationCap, Award, BookOpen, Code } from "lucide-react";

const educationMilestones = [
  {
    period: "2019 – 2023",
    institution: "Lincoln High School",
    degree: "High School Diploma — Honors",
    highlights: [
      "Graduated in the top 10% of the class",
      "President of the Computer Science Club",
      "Won 1st place at State Science Fair (Robotics category)",
      "Varsity debate team member",
    ],
    icon: GraduationCap,
  },
  {
    period: "2023 – Present",
    institution: "University of Technology",
    degree: "B.S. Computer Science — Junior Year",
    highlights: [
      "Dean's List for 4 consecutive semesters",
      "Undergraduate Research Assistant — AI Lab",
      "Teaching Assistant for Intro to Programming",
      "Member of ACM Student Chapter",
    ],
    icon: Code,
  },
];

const achievements = [
  { title: "Dean's List", count: "4x", description: "Consecutive semesters" },
  { title: "GPA", count: "3.8", description: "Cumulative GPA" },
  { title: "Research Papers", count: "2", description: "Published / co-authored" },
  { title: "Hackathons Won", count: "3", description: "Regional & national" },
];

const activities = [
  {
    title: "ACM Student Chapter",
    role: "Vice President",
    description: "Organizing coding workshops, tech talks, and hackathon prep sessions for 100+ members.",
  },
  {
    title: "Open Source Contributor",
    role: "Active Contributor",
    description: "Contributing to React-based open source projects, focusing on accessibility improvements.",
  },
  {
    title: "Peer Tutoring Program",
    role: "Lead Tutor",
    description: "Helping underclassmen with data structures, algorithms, and web development concepts.",
  },
  {
    title: "Hackathon Team",
    role: "Team Lead",
    description: "Led a team of 4 to build innovative solutions at regional and national hackathons.",
  },
];

const Education = () => {
  return (
    <>
      <PageHero
        image={educationImage}
        title="My Education"
        subtitle="Academic milestones, research, and the relentless pursuit of knowledge."
        alt="Study desk with books, laptop, and coffee"
      />

      {/* Education Timeline */}
      <section className="page-section">
        <AnimatedSection>
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">
            Academic Journey
          </p>
          <h2 className="section-title">Where I've Learned</h2>
        </AnimatedSection>

        <div className="space-y-8 mt-12">
          {educationMilestones.map((edu, index) => (
            <AnimatedSection key={edu.institution} delay={index * 0.15}>
              <div className="skill-card">
                <div className="flex items-start gap-6">
                  <div className="bg-accent rounded-xl p-4 shrink-0">
                    <edu.icon className="text-primary" size={28} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-foreground">
                          {edu.institution}
                        </h3>
                        <p className="text-primary font-body font-medium">{edu.degree}</p>
                      </div>
                      <span className="text-sm text-muted-foreground font-body bg-muted px-3 py-1 rounded-full self-start">
                        {edu.period}
                      </span>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {edu.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-muted-foreground">
                          <Award size={16} className="text-primary mt-1 shrink-0" />
                          <span className="font-body">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="page-section">
          <AnimatedSection>
            <h2 className="section-title text-center text-secondary-foreground">By the Numbers</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {achievements.map((ach, index) => (
              <AnimatedSection key={ach.title} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-4xl md:text-5xl font-bold text-primary">{ach.count}</p>
                  <p className="font-display text-lg font-semibold mt-2 text-secondary-foreground">{ach.title}</p>
                  <p className="text-sm text-secondary-foreground/70 mt-1">{ach.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="page-section">
        <AnimatedSection>
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">
            Beyond the Classroom
          </p>
          <h2 className="section-title">Extracurricular Activities</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {activities.map((activity, index) => (
            <AnimatedSection key={activity.title} delay={index * 0.1}>
              <div className="skill-card h-full">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={18} className="text-primary" />
                  <span className="text-sm font-body font-medium text-primary">{activity.role}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {activity.title}
                </h3>
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
