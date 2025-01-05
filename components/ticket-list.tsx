'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTicketContext } from '@/contexts/ticket-context'
import { getStaffIdFromCookie } from '@/lib/utils'

interface Ticket {
  id: string
  title: string
  status: string
  assignee: string
  dateOpened: string
  tags: string[]
}

interface StaffNameProps {
  staffId: string
}

const StaffName: React.FC<StaffNameProps> = ({ staffId }) => {
  const [staffName, setStaffName] = useState<string | null>(null)
  const [staffRole, setStaffRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStaffInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/staff/check-staff`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              staffId,
            }),
          }
        );

        const data = await response.json();
        setStaffName(data.discordDisplayName);
        setStaffRole(data.discordRole);
      } catch (error) {
        console.error('Error fetching staff info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStaffInfo()
  }, [staffId])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <div>{staffName}</div>
      <div className="text-sm text-muted-foreground">{staffRole}</div>
    </div>
  )
}

interface Tag {
  tagShort: string;
  tagLong: string;
}

const TicketTags: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await Promise.all(ticket.tags.map(async (tagId) => {
        const response = await fetch('/tags/get-tag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tagId }),
        });

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error('Failed to fetch tag:', tagId);
          return { tagShort: 'Unknown', tagLong: 'Unknown' };
        }
      }));

      setTags(fetchedTags);
    };

    fetchTags();
  }, [ticket.tags]);

  return (
    <>
      {tags.map((tag, index) => (
        <Badge key={index} variant="outline" className="rounded-full">
          {tag.tagShort}
        </Badge>
      ))}
    </>
  );
};

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const { filterType } = useTicketContext();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const staffId = getStaffIdFromCookie();
        if (!staffId) {
          console.error('No staffId found in cookie.');
          return;
        }

        const endpoint = `${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/${filterType}tickets`;
        const options: RequestInit = {
          method: filterType === 'assigned' ? 'POST' : 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          ...(filterType === 'assigned' && {
            body: JSON.stringify({ staffId }),
          }),
        };

        const response = await fetch(endpoint, options);

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: Ticket[] = await response.json()
        setTickets(data)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [filterType])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="rounded-2xl border overflow-hidden">
        <Table className="dark:bg-gray-900">
          <TableHeader>
            <TableRow>
              <TableHead className="rounded-tl-2xl">Ticket</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Assignee</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="rounded-tr-2xl hidden xl:table-cell">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {tickets.map((ticket) => (
                <motion.tr
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: "rgba(255,0,0,0.05)" }} 
                >
                    <TableCell className="font-medium">
                      <Link href={`/tickets/${ticket.id}`} className="block space-y-1">
                        <div className="font-mono text-sm">TICKET-{ticket.id}</div>
                        <div>{ticket.title}</div>
                        <div className="sm:hidden">
                          <Badge 
                            variant="secondary"
                            className="rounded-full"
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge 
                        variant="secondary"
                        className="rounded-full"
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {ticket.assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <div className="font-medium">
                              {ticket.assignee === "0" ? (
                                "Unknown"
                              ) : (
                                <StaffName staffId={ticket.assignee} />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {ticket.assignee === "0" ? "" : ""}
                            </div>
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{ticket.dateOpened}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex gap-2">
                        <TicketTags ticket={ticket} />
                      </div>
                    </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
