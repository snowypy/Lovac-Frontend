'use client'

import './globals.css'
import { Suspense, useEffect, useState } from "react"
import { TicketList } from "@/components/ticket-list"
import { TicketFilters } from "@/components/ticket-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { getStaffIdFromCookie } from '@/lib/utils'
import { TicketProvider } from '@/contexts/ticket-context'

const TicketsPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const staffId = getStaffIdFromCookie();
      if (staffId) {
        console.log('Staff ID:', staffId);

      } else {
        console.error('No staffId found in cookie.');
        window.location.href = '/signin';
      }
    }
  }, [isMounted]);

  return (
    <div className="container mx-auto px-4 py-8 bg-card">
      <h1 className="text-3xl font-bold mb-8">Tickets</h1>
      <div className="space-y-8">
        <Suspense fallback={<Skeleton className="h-10 w-full rounded-full" />}>  
          <TicketProvider>
            <TicketFilters/>
            <div className="container mx-auto px-4 py-8 bg-card">
              <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-2xl" />}>  
                <TicketList />
              </Suspense>
            </div>
          </TicketProvider>
        </Suspense>
      </div>
    </div>
  )
}

export default TicketsPage;