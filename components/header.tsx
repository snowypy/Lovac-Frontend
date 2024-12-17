'use client'

import { Bookmark, User } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MobileMenu } from "@/components/mobile-menu"
import { NotificationDropdown } from "@/components/notification-dropdown"

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800 transition-colors duration-300">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex h-16 items-center px-4 sm:px-6">
          <MobileMenu />
          <div className="flex items-center gap-2 flex-1">
            <Link href="/" className="font-semibold">Lovac</Link>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
              <nav className="flex items-center space-x-4">
                <Link href="/tickets" className="text-sm font-medium">
                  Tickets
                </Link>
                <Link href="/statistics" className="text-sm font-medium">
                  Statistics
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>
    </div>
  )
}

