'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Ticket } from 'lucide-react'

export default function TicketNotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ rotate: -45, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Ticket className="w-24 h-24 text-primary mx-auto mb-6" />
        </motion.div>
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404 - Ticket Not Found
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          We couldn't find the ticket you're looking for. It may have been resolved or deleted.
        </motion.p>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/tickets">
            <Button className="rounded-full mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all tickets
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              Go home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

