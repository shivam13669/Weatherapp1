import { Skeleton } from "@/components/ui/skeleton";

export function DailyForecastSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="mb-4">
              <Skeleton className="h-5 w-12 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-8 w-16" />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-1 w-full rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
