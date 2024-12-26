'use client'

import './globals.css'
import { Suspense, useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { TicketList } from "@/components/ticket-list"
import { TicketFilters } from "@/components/ticket-filters"
import { Skeleton } from "@/components/ui/skeleton"
import Cookies from 'js-cookie'
import { getStaffIdFromCookie } from '@/lib/utils'

const TicketsPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const staffIds = getStaffIdFromCookie();
      if (staffIds) {
        console.log('Staff ID:', staffIds);
        
        Cookies.set('staffIds', staffIds, {
          expires: 14,
          path: '/',
          sameSite: 'none',
          secure: true
        });

        fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/auth/staffId', {
          method: 'GET',
          credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

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
          <TicketFilters />
        </Suspense>
        <div className="container mx-auto px-4 py-8 bg-card">
          <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-2xl" />}>
            <TicketList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default TicketsPage;