'use client'

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, X } from 'lucide-react'

interface Ticket {
  id: string
  title: string
  status: string
  assignee: string
  dateOpened: string
  tags: string[]
}

interface Tag {
  id: number
  tagShort: string
  tagLong: string
  tagColor: string
  tagIcon: string
}

interface StaffInfo {
  discordDisplayName: string
  discordRole: string
  discordAvatar: string
}

export function TicketInfo({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [staffInfo, setStaffInfo] = useState<StaffInfo | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketResponse = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/tickets/${ticketId}`)
        const ticketData = await ticketResponse.json()
        setTicket(ticketData)

        if (ticketData.assignee !== "0") {
          const staffResponse = await fetch(
            `${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/staff/check-staff`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                staffId: ticketData.assignee,
              }),
            }
          )
          const staffData = await staffResponse.json()
          setStaffInfo(staffData)
        }

        const tagsResponse = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/tags`)
        const tagsData = await tagsResponse.json()
        setTags(tagsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [ticketId])

  const addTag = async (tagId: number) => {
    if (!ticket) return
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/apply-tag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagId,
          ticketId: ticket.id,
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setTicket(prev => prev ? {
          ...prev,
          tags: [...prev.tags, tagId.toString()]
        } : null)
      }
    } catch (error) {
      console.error('Error adding tag:', error)
    }
    setIsOpen(false)
  }

  const removeTag = async (tagId: string) => {
    if (!ticket) return
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/remove-tag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagId: Number(tagId),
          ticketId: ticket.id,
        }),
      })
      
      if (response.ok) {
        setTicket(prev => prev ? {
          ...prev,
          tags: prev.tags.filter(t => t !== tagId)
        } : null)
      }
    } catch (error) {
      console.error('Error removing tag:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="text-muted-foreground">Ticket not found</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 h-[calc(100vh-10rem)] overflow-auto pr-2"
    >
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Assignee</CardTitle>
        </CardHeader>
        <CardContent>
          {ticket.assignee === "0" ? (
            <div className="text-muted-foreground">Unassigned</div>
          ) : (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={staffInfo?.discordAvatar} />
                <AvatarFallback>
                  {staffInfo?.discordDisplayName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{staffInfo?.discordDisplayName}</div>
                <div className="text-sm text-muted-foreground">{staffInfo?.discordRole}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tags</CardTitle>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`w-full px-2 py-1 text-left rounded-lg hover:bg-muted ${
                      ticket.tags.includes(tag.id.toString()) ? 'opacity-50' : ''
                    }`}
                    onClick={() => addTag(tag.id)}
                    disabled={ticket.tags.includes(tag.id.toString())}
                  >
                    <span className="flex items-center gap-2">
                      {tag.tagIcon && <span className="text-lg">{tag.tagIcon}</span>}
                      <span>{tag.tagLong}</span>
                    </span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ticket.tags.length === 0 ? (
              <div className="text-muted-foreground">No tags</div>
            ) : (
              ticket.tags.map((tagId) => {
                const tag = tags.find((t) => t.id.toString() === tagId)
                if (!tag) return null
                return (
                  <Badge
                    key={tagId}
                    className="flex items-center gap-1"
                    style={{ backgroundColor: tag.tagColor }}
                  >
                    {tag.tagIcon && <span>{tag.tagIcon}</span>}
                    {tag.tagShort}
                    <button
                      className="ml-1 hover:opacity-80"
                      onClick={() => removeTag(tagId)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
