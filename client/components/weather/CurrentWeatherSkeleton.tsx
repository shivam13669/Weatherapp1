import { Skeleton } from "@/components/ui/skeleton";

export function CurrentWeatherSkeleton() {
  return (
    <div className="w-full">
      {/* Main Current Conditions */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-10 w-48 mb-4" />
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-24 w-24 rounded-lg" />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
