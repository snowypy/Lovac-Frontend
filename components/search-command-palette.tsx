// This component is using demo logic and will be implemented soon.
// Author: SnowyJS (https://snowyjs.lol)
'use client'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
interface Ticket {
  id: string
  title: string | null
}
export function SearchCommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const router = useRouter()
  const tickets: Ticket[] = [
    { id: '00001', title: null },
    { id: '00002', title: null },
    { id: '00003', title: null },
    { id: '00004', title: null },
    { id: '00005', title: 'Lag Issue' },
    { id: '00006', title: 'Reporting User' },
    { id: '00007', title: 'Client side issue when entering dono area.' },
    { id: '00008', title: 'Bot Account appeal' },
  ]
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = search.toLowerCase()
    return (
      ticket.id.includes(searchLower) ||
      (ticket.title && ticket.title.toLowerCase().includes(searchLower))
    )
  })
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-background">
          <Command className="rounded-lg border-none bg-transparent">
            <div className="flex items-center border-b px-3 dark:border-gray-800">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Type a command or search..."
                className="placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={search}
                onValueChange={setSearch}
              />
              <button
                onClick={() => setOpen(false)}
                className="ml-2 p-1 rounded-md hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <CommandList>
              <CommandEmpty>No tickets found.</CommandEmpty>
              <CommandGroup>
                <AnimatePresence>
                  {filteredTickets.map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CommandItem
                        onSelect={() => {
                          router.push(`/tickets/${ticket.id}`)
                          setOpen(false)
                        }}
                        className="px-4 py-2 cursor-pointer"
                      >
                        <span className="font-mono">{ticket.id}</span>
                        {ticket.title && (
                          <span className="ml-2 text-muted-foreground">
                            - {ticket.title}
                          </span>
                        )}
                      </CommandItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}