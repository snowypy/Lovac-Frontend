'use client'

import { Suspense } from "react";
import { ChevronLeft, Download } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketChat } from "@/components/ticket-chat";
import { TicketInfo } from "@/components/ticket-info";
import { useParams } from 'next/navigation';

export default function TicketPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <header className="border-b dark:border-gray-800">
        <div className="container mx-auto px-4 flex items-center gap-4 h-16">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">TICKET-{id}</h1>
            <p className="text-sm text-muted-foreground truncate">User Appeal</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Download Transcript</span>
          </Button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <Suspense fallback={<Skeleton className="h-[600px] rounded-2xl" />}>
            <TicketChat ticketId={id as string} />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[400px] rounded-2xl" />}>
            <TicketInfo ticketId={id as string} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}