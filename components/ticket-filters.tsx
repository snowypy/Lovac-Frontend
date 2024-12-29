'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTicketContext } from '@/contexts/ticket-context'

export function TicketFilters() {
  const { filterType, setFilterType } = useTicketContext();

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
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/all')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
        <Button 
          variant={filterType === 'open' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('open')}
        >
          Open <Badge variant={filterType === 'open' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/open')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
        <Button 
          variant={filterType === 'unassigned' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('unassigned')}
        >
          Unassigned <Badge variant={filterType === 'unassigned' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/unassigned')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
        <Button 
          variant={filterType === 'assigned' ? "secondary" : "ghost"} 
          className="whitespace-nowrap rounded-full"
          onClick={() => setFilterType('assigned')}
        >
          Assigned <Badge variant={filterType === 'assigned' ? "secondary" : "outline"} className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/assigned')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
      </div>
    </motion.div>
  )
}
