'use client'

import { Button } from "@/components/ui/button"
import { AuthLayout } from "@/components/auth-layout"
import { Link2 } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <AuthLayout title="Sign In">
        <Link href={`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/register`}>
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              <Link2 className="mr-2 h-4 w-4" />
              Sign in with Discord
            </Button>
        </Link>
      
    </AuthLayout>
  )
}

