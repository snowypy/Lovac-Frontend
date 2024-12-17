'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="w-[200px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800 transition-colors duration-300 space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            GENERAL
          </h2>
          <div className="space-y-1">
            <Button 
              variant="secondary" 
              className="w-full justify-start rounded-full"
            >
              Tickets
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start rounded-full"
            >
              Statistics
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

