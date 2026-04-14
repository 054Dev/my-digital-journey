import { useEffect, useRef } from "react";

const codeSnippets = [
  "const x = 42;",
  "fn main() {",
  "import React",
  "<div />",
  "=> {",
  "async/await",
  "git push",
  "npm run",
  "0xFF",
  "true",
  "null",
  "while(1)",
  "class App",
  "export default",
  "useState()",
  "console.log",
  "return (",
  "};",
  "===",
  "...",
];

const CodeParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLSpanElement[] = [];
    const count = 15;

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      span.className = "code-particle";
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.animationDelay = `${Math.random() * 20}s`;
      span.style.animationDuration = `${15 + Math.random() * 25}s`;
      span.style.fontSize = `${10 + Math.random() * 4}px`;
      span.style.opacity = `${0.04 + Math.random() * 0.08}`;
      container.appendChild(span);
      particles.push(span);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};

export default CodeParticles;
