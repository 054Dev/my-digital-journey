import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/usePortfolioData";
import {
  CORE_KEYWORDS,
  DEFAULT_LOCATION,
  DEFAULT_SOCIAL_IMAGE,
  PERSON_ALIASES,
  PERSON_FIRST_NAME,
  PERSON_NAME,
  PERSON_ROLE,
  SITE_BRAND,
  SITE_URL,
} from "@/lib/seo";

interface SEOOptions {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  image?: string;
  noIndex?: boolean;
}

const pageDefaults: Record<string, { title: string; description: string; keywords: string[]; priority: number }> = {
  "/": {
    title: `${PERSON_NAME} — ${PERSON_ROLE} | ${SITE_BRAND}`,
    description: `${PERSON_NAME}, also known as Dancon, is a ${PERSON_ROLE} building modern web apps with React, TypeScript, and full stack tools in Kenya.`,
    keywords: ["Duncan Ndegwa portfolio", "Dancon Software portfolio", "software engineer portfolio"],
    priority: 1,
  },
  "/childhood": {
    title: `${PERSON_NAME} Story & Background | ${SITE_BRAND}`,
    description: `Learn about ${PERSON_NAME}'s background, values, and formative story behind the Dancon Software portfolio.`,
    keywords: ["Duncan Ndegwa story", "Dancon background", "software engineer journey"],
    priority: 0.7,
  },
  "/education": {
    title: `${PERSON_NAME} Education & Software Engineering Training`,
    description: `Explore ${PERSON_NAME}'s education, academic journey, achievements, and software engineering training.`,
    keywords: ["Duncan Ndegwa education", "software engineering student", "software engineering training"],
    priority: 0.85,
  },
  "/skills": {
    title: `${PERSON_NAME} Skills, Projects & React Developer Portfolio`,
    description: `View ${PERSON_NAME}'s software engineering skills, React projects, TypeScript work, web development portfolio, and Dancon Software projects.`,
    keywords: ["Duncan Ndegwa projects", "Dancon Software projects", "React developer portfolio", "TypeScript developer"],
    priority: 0.95,
  },
  "/aspirations": {
    title: `${PERSON_NAME} Career Goals & Software Engineering Aspirations`,
    description: `Discover ${PERSON_NAME}'s software engineering aspirations, career goals, technology vision, and future plans for Dancon Software.`,
    keywords: ["Duncan Ndegwa goals", "Dancon Software vision", "software engineer aspirations"],
    priority: 0.75,
  },
  "/resume": {
    title: `${PERSON_NAME} Resume & CV | Software Engineer`,
    description: `Download or preview ${PERSON_NAME}'s software engineer resume and CV, including skills, education, projects, and experience.`,
    keywords: ["Duncan Ndegwa resume", "Duncan Ndegwa CV", "software engineer CV", "software engineer resume"],
    priority: 0.9,
  },
  "/contact": {
    title: `Contact ${PERSON_NAME} | ${SITE_BRAND}`,
    description: `Contact ${PERSON_NAME}, Dancon Software, for software engineering, web development, React, and full stack collaboration opportunities.`,
    keywords: ["contact Duncan Ndegwa", "contact Dancon Software", "hire software engineer Kenya"],
    priority: 0.85,
  },
};

const normalizePath = (value?: string) => {
  if (!value) return "/";
  const clean = value.split(/[?#]/)[0];
  return clean === "" ? "/" : clean.replace(/\/$/, "") || "/";
};

const truncate = (value: string, max: number) => (value.length > max ? `${value.slice(0, max - 1).trim()}…` : value);

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

export const usePageSEO = ({ title, description, path, keywords, type = "website", image, noIndex = false }: SEOOptions) => {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    const currentPath = normalizePath(path || (typeof window !== "undefined" ? window.location.pathname : "/"));
    const defaults = pageDefaults[currentPath] || pageDefaults["/"];
    const dbName = settings?.full_name?.trim();
    const name = !dbName || /alex rivera/i.test(dbName) ? PERSON_NAME : dbName;
    const dbFirstName = settings?.first_name?.trim();
    const firstName = !dbFirstName || /alex/i.test(dbFirstName) ? PERSON_FIRST_NAME : dbFirstName;
    const role = PERSON_ROLE;
    const rawTitle = title || defaults.title;
    const fullTitle = truncate(rawTitle.includes(name) ? rawTitle : `${rawTitle} | ${name}`, 58);
    const finalDesc = truncate(
      description || settings?.bio_short || defaults.description,
      155,
    );
    document.title = fullTitle;

    const allKeywords = [
      ...(keywords || []),
      ...defaults.keywords,
      ...CORE_KEYWORDS,
      name,
      firstName,
      `${name} portfolio`,
      `${name} developer`,
      `${name} software engineer`,
      `${firstName} software`,
      `${firstName} developer`,
    ]
      .filter(Boolean)
      .filter((value, index, arr) => arr.findIndex((item) => item.toLowerCase() === value.toLowerCase()) === index)
      .join(", ");

    const canonical = `${SITE_URL}${currentPath === "/" ? "/" : currentPath}`;
    const socialImage = image || DEFAULT_SOCIAL_IMAGE;

    setMeta('meta[name="description"]', "name", "description", finalDesc);
    setMeta('meta[name="keywords"]', "name", "keywords", allKeywords);
    setMeta('meta[name="author"]', "name", "author", name);
    setMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta('meta[name="googlebot"]', "name", "googlebot", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");
    setMeta('meta[name="theme-color"]', "name", "theme-color", "#0f172a");

    setLink("canonical", canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", finalDesc);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_BRAND);
    setMeta('meta[property="og:image"]', "property", "og:image", socialImage);
    setMeta('meta[property="og:locale"]', "property", "og:locale", "en_KE");

    // Twitter
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", finalDesc);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImage);

    // JSON-LD: Person
    setJsonLd("ld-person", {
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      givenName: firstName,
      alternateName: PERSON_ALIASES,
      jobTitle: role,
      description: settings?.bio_short || finalDesc,
      url: SITE_URL,
      image: socialImage,
      address: { "@type": "PostalAddress", addressLocality: DEFAULT_LOCATION },
      knowsAbout: ["Software Engineering", "React", "TypeScript", "Web Development", "Frontend Development", "Full Stack Development"],
      sameAs: [],
    });

    // JSON-LD: WebSite with SearchAction
    setJsonLd("ld-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_BRAND,
      alternateName: [`${name} Portfolio`, ...PERSON_ALIASES],
      url: SITE_URL,
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
      isPartOf: { "@type": "WebSite", name: SITE_BRAND, url: SITE_URL },
      primaryImageOfPage: { "@type": "ImageObject", url: socialImage },
    });
  }, [title, description, path, keywords, type, image, noIndex, settings]);
};
