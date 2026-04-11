import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings, useResumeFiles } from "@/hooks/usePortfolioData";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/childhood", label: "Childhood" },
  { path: "/education", label: "Education" },
  { path: "/skills", label: "Skills" },
  { path: "/aspirations", label: "Aspirations" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: settings } = useSiteSettings();
  const { data: resumeFiles } = useResumeFiles();

  const name = settings?.full_name || "Alex Rivera";
  const tagline = settings?.tagline || "Computer Science Student • Dreamer • Creator";
  const resumeFile = resumeFiles?.find(f => f.file_type === "resume");
  const cvFile = resumeFiles?.find(f => f.file_type === "cv");
  const downloadFile = resumeFile || cvFile;

  // Don't show layout on setup page
  if (location.pathname === "/setup") return <>{children}</>;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-semibold text-foreground tracking-tight">
            {name}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`nav-link text-foreground/70 hover:text-foreground ${location.pathname === item.path ? "active text-foreground" : ""}`}>
                {item.label}
              </Link>
            ))}
            {downloadFile && (
              <a href={downloadFile.file_url} download className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                <Download size={14} /> CV
              </a>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground p-2" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background border-b border-border overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`nav-link text-foreground/70 hover:text-foreground py-2 ${location.pathname === item.path ? "active text-foreground" : ""}`}>
                    {item.label}
                  </Link>
                ))}
                {downloadFile && (
                  <a href={downloadFile.file_url} download className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                    <Download size={14} /> Download CV
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">
        <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-display text-lg font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground mt-1">{tagline}</p>
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {name}. Crafted with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
