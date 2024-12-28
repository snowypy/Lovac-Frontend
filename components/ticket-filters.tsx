// This component is using demo logic and will be implemented soon.
// Author: SnowyJS (https://snowyjs.lol)

'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStaffIdFromCookie } from "@/lib/utils"

interface TicketFiltersProps {
  onFilterChange: (filterType: string) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({ onFilterChange }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <Button variant="secondary" className="whitespace-nowrap rounded-full" onClick={() => onFilterChange('all')}>
          All <Badge variant="secondary" className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/all')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
        <Button variant="ghost" className="whitespace-nowrap rounded-full" onClick={() => onFilterChange('open')}>
          Open <Badge variant="outline" className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/open')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
        <Button variant="ghost" className="whitespace-nowrap rounded-full" onClick={() => onFilterChange('unassigned')}>
          Unassigned <Badge variant="outline" className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/unassigned')
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
        <Button variant="ghost" className="whitespace-nowrap rounded-full" onClick={() => onFilterChange('assigned')}>
          Assigned to me <Badge variant="outline" className="ml-2 rounded-full">
            {fetch(process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL + '/ticketdata/assigned', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ staffId: getStaffIdFromCookie() }),
            })
              .then(r => r.json())
              .then(data => data.length)}
          </Badge>
        </Button>
      </div>
    </motion.div>
  )
}

export default TicketFilters;
