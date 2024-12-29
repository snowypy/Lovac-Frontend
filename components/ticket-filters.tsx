'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTicketContext } from '@/contexts/ticket-context'
import { getStaffIdFromCookie } from '@/lib/utils'

export function TicketFilters() {
  const { filterType, setFilterType } = useTicketContext();
  const [counts, setCounts] = useState({
    all: 0,
    open: 0,
    unassigned: 0,
    assigned: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const staffId = getStaffIdFromCookie();
        if (!staffId) {
          console.error('No staffId found in cookie.');
          return;
        }

        const [allRes, openRes, unassignedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/ticketdata/all`),
          fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/ticketdata/open`),
          fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/ticketdata/unassigned`)
        ]);

        const assignedRes = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/ticketdata/assigned`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ staffId }),
        });

        const [all, open, unassigned, assigned] = await Promise.all([
          allRes.json(),
          openRes.json(),
          unassignedRes.json(),
          assignedRes.json()
        ]);

        setCounts({
          all: all.length,
          open: open.length,
          unassigned: unassigned.length,
          assigned: assigned.length
        });
      } catch (error) {
        console.error('Error fetching ticket counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <Button 
          variant={filterType === 'all' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('all')}
        >
          All <Badge variant={filterType === 'all' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {counts.all}
          </Badge>
        </Button>
        <Button 
          variant={filterType === 'open' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('open')}
        >
          Open <Badge variant={filterType === 'open' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {counts.open}
          </Badge>
        </Button>
        <Button 
          variant={filterType === 'unassigned' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('unassigned')}
        >
          Unassigned <Badge variant={filterType === 'unassigned' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {counts.unassigned}
          </Badge>
        </Button>
        <Button 
          variant={filterType === 'assigned' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('assigned')}
        >
          Assigned <Badge variant={filterType === 'assigned' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {counts.assigned}
          </Badge>
        </Button>
      </div>
    </motion.div>
  )
}
