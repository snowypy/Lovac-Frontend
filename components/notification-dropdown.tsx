// This component is using demo logic and will be implemented soon.
// Author: SnowyJS (https://snowyjs.lol)

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

interface Notification {
  id: string
  ticketId: string
  message: string
  timestamp: string
  read: boolean
  archived: boolean
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      ticketId: '00001',
      message: 'has a new message\nPlease help!',
      timestamp: '2 minutes ago',
      read: false,
      archived: false
    },
    {
      id: '2',
      ticketId: '00002',
      message: 'has a new message\nI A M NOT NMEANT TO BE BABNNDNED',
      timestamp: '5 minutes ago',
      read: false,
      archived: false
    },
    {
      id: '3',
      ticketId: '00003',
      message: 'has a new message\nya si me gusta',
      timestamp: '10 minutes ago',
      read: false,
      archived: false
    }
  ])

  const inboxNotifications = notifications.filter(n => !n.archived)
  const archivedNotifications = notifications.filter(n => n.archived)

  const archiveNotification = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, archived: true } : n
    ))
  }

  const archiveAll = () => {
    setNotifications(notifications.map(n => ({ ...n, archived: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-4 w-4" />
          {inboxNotifications.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full"
            >
              {inboxNotifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[380px] p-0 rounded-xl"
        align="end"
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <h2 className="font-semibold">Notifications</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm hover:text-primary"
            onClick={archiveAll}
          >
            Archive all
          </Button>
        </div>
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="w-full rounded-none border-b dark:border-gray-800">
            <TabsTrigger 
              value="inbox" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Inbox ({inboxNotifications.length})
            </TabsTrigger>
            <TabsTrigger 
              value="archived" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Archived ({archivedNotifications.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inbox" className="p-0">
            <AnimatePresence>
              {inboxNotifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              ) : (
                <div className="max-h-[400px] overflow-auto">
                  {inboxNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative group"
                    >
                      <Link 
                        href={`/tickets/${notification.ticketId}`}
                        className="block p-4 hover:bg-muted/50 border-b dark:border-gray-800"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium">
                              Ticket #{notification.ticketId} {notification.message.split('\n')[0]}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message.split('\n')[1]}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault()
                              archiveNotification(notification.id)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="archived" className="p-0">
            <AnimatePresence>
              {archivedNotifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No archived notifications
                </div>
              ) : (
                <div className="max-h-[400px] overflow-auto">
                  {archivedNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 border-b dark:border-gray-800"
                    >
                      <Link href={`/tickets/${notification.ticketId}`}>
                        <p className="font-medium">
                          Ticket #{notification.ticketId} {notification.message.split('\n')[0]}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message.split('\n')[1]}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.timestamp}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
