const FloatingShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
    {/* Neon glow circles */}
    <div className="floating-shape shape-1" />
    <div className="floating-shape shape-2" />
    <div className="floating-shape shape-3" />
    {/* Grid lines */}
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04]" />
  </div>
);

export default FloatingShapes;
