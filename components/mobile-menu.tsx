'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import Link from "next/link"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link href="/" className="text-lg font-semibold">
            Dash
          </Link>
          <Link href="/tickets" className="text-lg font-semibold">
            Tickets
          </Link>
          <Link href="/statistics" className="text-lg font-semibold">
            Statistics
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

