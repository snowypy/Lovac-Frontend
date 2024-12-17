'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Search className="w-24 h-24 text-primary mx-auto mb-6" />
        </motion.div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            <div className="text-center mb-2">
              <div className="text-center mb-2">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  404 - Page Not Found
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 text-xl text-muted-foreground">
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Oops! The page you're looking for doesn't exist.
          </motion.p>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/">
              <Button className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go back home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
