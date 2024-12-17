// This component is using demo logic and will be implemented soon.
// Author: SnowyJS (https://snowyjs.lol)

'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TicketFilters() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <Button variant="secondary" className="whitespace-nowrap rounded-full">
        All <Badge variant="secondary" className="ml-2 rounded-full">2</Badge>
      </Button>
      <Button variant="ghost" className="whitespace-nowrap rounded-full">
        Open <Badge variant="outline" className="ml-2 rounded-full">1</Badge>
      </Button>
      <Button variant="ghost" className="whitespace-nowrap rounded-full">
        Unassigned <Badge variant="outline" className="ml-2 rounded-full">0</Badge>
      </Button>
      <Button variant="ghost" className="whitespace-nowrap rounded-full">
        Assigned to me <Badge variant="outline" className="ml-2 rounded-full">1</Badge>
      </Button>
    </motion.div>
  )
}

