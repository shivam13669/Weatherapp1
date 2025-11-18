import { Skeleton } from "@/components/ui/skeleton";

export function HourlyForecastSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex gap-4 p-4 min-w-min">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 flex-shrink-0 min-w-[100px]"
              >
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
