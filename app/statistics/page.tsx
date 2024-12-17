import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { StaffPodium } from "@/components/staff-podium"
import { StatCard } from "@/components/stat-card"

export default function StatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Staff Statistics</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-2xl" />}>
          <StatCard title="Tickets Claimed" value={1234} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-2xl" />}>
          <StatCard title="Messages Sent" value={5678} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-2xl" />}>
          <StatCard title="Tickets Closed" value={910} />
        </Suspense>
      </div>
      
      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-2xl mt-8" />}>
          <StaffPodium />
        </Suspense>
      </div>
    </div>
  )
}
