'use client'

import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/auth-layout"
import { LogOut } from 'lucide-react'

export default function SignOutPage() {
  return (
    <AuthLayout title="Sign Out">
      <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    </AuthLayout>
  )
}