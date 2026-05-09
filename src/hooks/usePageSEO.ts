import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/usePortfolioData";

interface SEOOptions {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  image?: string;
}

const setMeta = (selector: string, attr: string, key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const setJsonLd = (id: string, data: object) => {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

export const usePageSEO = ({ title, description, path, keywords, type = "website", image }: SEOOptions) => {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    const name = settings?.full_name || "Portfolio";
    const firstName = settings?.first_name || "";
    const role = "Software Engineer";
    const baseTitle = `${name} — ${role} Portfolio`;

    const fullTitle = title ? `${title} | ${name} — ${role}` : baseTitle;
    document.title = fullTitle;

    const finalDesc =
      description ||
      settings?.bio_short ||
      `${name} — ${role} portfolio. Explore projects, skills, education, and aspirations.`;

    const baseKeywords = [
      name,
      firstName,
      role,
      "software engineer",
      "software engineering",
      "web developer",
      "frontend developer",
      "full stack developer",
      "portfolio",
      "projects",
      "Kenya",
      `${name} portfolio`,
      `${name} developer`,
      `${name} software engineer`,
      `${firstName} software`,
    ].filter(Boolean);
    const allKeywords = [...new Set([...(keywords || []), ...baseKeywords])].join(", ");

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const currentPath = path || (typeof window !== "undefined" ? window.location.pathname : "/");
    const canonical = `${origin}${currentPath}`;

    setMeta('meta[name="description"]', "name", "description", finalDesc);
    setMeta('meta[name="keywords"]', "name", "keywords", allKeywords);
    setMeta('meta[name="author"]', "name", "author", name);
    setMeta('meta[name="robots"]', "name", "robots", "index, follow, max-image-preview:large");
    setMeta('meta[name="googlebot"]', "name", "googlebot", "index, follow");

    setLink("canonical", canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", finalDesc);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", `${name} Portfolio`);
    if (image) setMeta('meta[property="og:image"]', "property", "og:image", image);

    // Twitter
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", finalDesc);
    if (image) setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    // JSON-LD: Person
    setJsonLd("ld-person", {
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      givenName: firstName,
      jobTitle: role,
      description: settings?.bio_short || finalDesc,
      url: origin || canonical,
      sameAs: [],
    });

    // JSON-LD: WebSite with SearchAction
    setJsonLd("ld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${name} Portfolio`,
      url: origin,
      author: { "@type": "Person", name },
    });

    // JSON-LD: WebPage
    setJsonLd("ld-webpage", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description: finalDesc,
      url: canonical,
      inLanguage: "en",
    });
  }, [title, description, path, keywords, type, image, settings]);
};
