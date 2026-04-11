import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton = () => (
  <div className="min-h-screen">
    <Skeleton className="w-full h-[60vh]" />
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-12 w-96" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="skill-card space-y-3">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const HeroSkeleton = () => (
  <section className="page-hero">
    <Skeleton className="absolute inset-0 w-full h-full" />
    <div className="page-hero-content relative z-10">
      <Skeleton className="h-12 w-80 bg-muted/30" />
      <Skeleton className="h-6 w-96 mt-4 bg-muted/30" />
    </div>
  </section>
);
