'use client'

import { TicketProvider } from '@/contexts/ticket-context'

export function TicketProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <TicketProvider>{children}</TicketProvider>
}
