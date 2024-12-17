import './globals.css'
import { Suspense } from "react"
import { TicketList } from "@/components/ticket-list"
import { TicketFilters } from "@/components/ticket-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default function TicketsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tickets</h1>
      <div className="space-y-8">
        <Suspense fallback={<Skeleton className="h-10 w-full rounded-full" />}>
          <TicketFilters />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-2xl" />}>
          <TicketList />
        </Suspense>
      </div>
    </div>
  )
}

