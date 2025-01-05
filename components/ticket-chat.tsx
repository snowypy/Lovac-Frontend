'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CommandPalette } from "@/components/command-palette"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getStaffIdFromCookie } from '../lib/utils';

interface Message {
  author: string
  username: string
  authorAvatar: string
  date: string
  message: string
  staffRole: string
}

const staffRoleColors: Record<string, string> = {
  Owner: '#ffd700',
  Manager: '#d82f65',
  Admin: '#e0283e',
  Support: '#4a77f1',
  Moderator: '#22ca4a',
  Developer: '#6449c6',
};

export function TicketChat({ ticketId }: { ticketId: string }) {
  const [showCommands, setShowCommands] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [closeReason, setCloseReason] = useState('')
  const [isClosed, setIsClosed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isAssigned, setIsAssigned] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchTicketStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/tickets/${ticketId}`);
        const ticketData = await response.json();
        setIsClosed(ticketData.status === 'Closed');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Failed to fetch ticket status:', err.message);
          setError(err.message);
        } else {
          console.error('Failed to fetch ticket status:', err);
          setError('An unknown error occurred');
        }
      }
    };

    fetchTicketStatus();
  }, [ticketId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const staffId = getStaffIdFromCookie();
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffId, ticketId: Number(ticketId) })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.statusText}`);
        }

        const data = await response.json();
        setMessages(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Failed to fetch messages:', err.message);
          setError(err.message);
        } else {
          console.error('Failed to fetch messages:', err);
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    intervalRef.current = setInterval(fetchMessages, 15000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ticketId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isClosed) return;

    try {
      const staffId = getStaffIdFromCookie();
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/new-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ staffId, ticketId, body: inputValue })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      if (!isAssigned) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/assign`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffId, ticketId })
          });

          if (!response.ok) {
            throw new Error('Failed to assign ticket');
          }

          console.log('Ticket assigned successfully');
          setIsAssigned(true);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error('Error assigning ticket:', err.message);
          } else {
            console.error('Error assigning ticket:', err);
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to send message:', err.message);
        setError(err.message);
      } else {
        console.error('Failed to send message:', err);
        setError('An unknown error occurred');
      }
    }

    setInputValue('');
    setTimeout(() => {
      const fetchMessages = async () => {
        try {
          const staffId = getStaffIdFromCookie();
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffId, ticketId })
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch messages: ${response.statusText}`);
          }

          const data = await response.json();
          setMessages(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error('Failed to fetch messages:', err.message);
            setError(err.message);
          } else {
            console.error('Failed to fetch messages:', err);
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.endsWith('/')) {
      setShowCommands(true)
    } else {
      setShowCommands(false)
    }
  }

  const handleCommand = async (command: string) => {
    if (isClosed) return;

    switch (command) {
      case 'Appeal Format Snippet':
        setInputValue(inputValue + "\n\nAppeal Format:\n1. Reason for appeal:\n2. Evidence:\n3. Additional comments:")
        break
      case 'Report Format Snippet':
        setInputValue(inputValue + "\n\nReport Format:\n1. Player being reported:\n2. Reason for report:\n3. Evidence:\n4. Additional information:")
        break
      case 'Unassign Ticket':
        const unassignResponse = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/unassign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffId: getStaffIdFromCookie(), ticketId: Number(ticketId) })
        });

        if (!unassignResponse.ok) {
          throw new Error(`Failed to unassign ticket: ${unassignResponse.statusText}`);
        }

        console.log('Ticket unassigned successfully');
        break
      case 'Send Close Request':
        const responses = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/close-ticket`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ staffId: getStaffIdFromCookie(), ticketId: Number(ticketId) })
        });

        if (!responses.ok) {
          throw new Error(`Failed to send close request: ${responses.statusText}`);
        }
        break
      case 'Close Ticket':
        setShowCloseDialog(true)
        break
      case 'Ping User':
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ticket owner: ${response.statusText}`);
        }
        const data = await response.json();
        setInputValue(`<@${data.ownerId}>`);
        break
    }
    setShowCommands(false)
    textareaRef.current?.focus()
  }

  const handleForceClose = async () => {
    if (isClosed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOVAC_BACKEND_URL}/api/force-close-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          staffId: getStaffIdFromCookie(),
          ticketId: Number(ticketId),
          reason: closeReason
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to force close ticket: ${response.statusText}`);
      }  
      console.log('Ticket force closed successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to force close ticket:', err.message);
        setError(err.message);
      } else {
        console.error('Failed to force close ticket:', err);
        setError('An unknown error occurred');
      }
    }
    setShowCloseDialog(false)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  if (loading) return <div>Loading messages...</div>
  if (error) return <div>Error loading messages: {error}</div>

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-h-36 space-y-2 h-[calc(100vh-10rem)] flex flex-col rounded-2xl border dark:border-gray-800 overflow-hidden flex-shrink-0">
      <div className="bg-muted p-4 dark:bg-gray-800/50">
          <pre className="text-sm overflow-auto whitespace-pre-wrap break-words max-h-60">
            <code>
              User banned: Cigan
              <br /> 
              Reason: Bot Account
              <br />
              Duration: Forever
            </code>
          </pre>
        </div>
        <div className="text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="ml-2 rounded-full">Lower Time</Button> <Button variant="ghost" size="sm" className="ml-2 rounded-full">Lift Punishment</Button> <Button variant="destructive" size="sm" className="ml-2 rounded-full">Blacklist</Button>
        </div>
      </div>

        <div className="p-4" />
        
      <div className="space-y-6 flex-grow overflow-auto">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ backgroundColor: "rgba(255,0,0,0.05)" }} 
          >
            <div className="flex gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.authorAvatar} />
                <AvatarFallback>{message.username}</AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span style={{ color: staffRoleColors[message.staffRole] || '' }} className={`font-medium text-${staffRoleColors[message.staffRole]}`}>{message.username}</span>
                  <span className="text-sm text-muted-foreground">{new Date(message.date).toLocaleString()}</span>
                </div>
                <div className="text-sm">{message.message}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background dark:bg-gray-900 pt-6 flex-shrink-0">
        <div className="relative">
          <Textarea 
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply... (Type / for commands)" 
            className="resize-none rounded-2xl pr-20"
            value={inputValue}
            onChange={handleInputChange}
            rows={1}
            disabled={isClosed}
          />
          <AnimatePresence>
            {showCommands && (
              <CommandPalette onSelect={handleCommand} />
            )}
          </AnimatePresence>
          <Button className="absolute bottom-2 right-2 rounded-full" onClick={handleSendMessage} disabled={isClosed}>Send</Button>
        </div>
        <AlertDialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Force Close Ticket</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to force close this ticket? This action cannot be undone.
                <Textarea
                  placeholder="Enter reason for force closing..."
                  className="mt-4"
                  value={closeReason}
                  onChange={(e) => setCloseReason(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleForceClose}>Force Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  )
}