'use client'

import { motion } from 'framer-motion'
import { SnailIcon as Snippet, UserMinus, SendHorizontal, XCircle, Bell } from 'lucide-react'

interface CommandPaletteProps {
  onSelect: (command: string) => void
}

const commands = [
  { label: 'Insert Snippet', subCommands: ['Appeal Format Snippet', 'Report Format Snippet'], icon: Snippet },
  { label: 'Unassign Ticket', icon: UserMinus },
  { label: 'Send Close Request', icon: SendHorizontal },
  { label: 'Close Ticket', icon: XCircle },
  { label: 'Ping User', icon: Bell },
]

export function CommandPalette({ onSelect }: CommandPaletteProps) {
  return (
    <div className="absolute bottom-full left-0 w-full mb-2 bg-background dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className="absolute bottom-full left-0 w-full mb-2 bg-background dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
          {commands.map((command, index) => (
            <div key={command.label}>
              {command.subCommands ? (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">{command.label}</div>
                  {command.subCommands.map((subCommand, subIndex) => (
                    <button
                      key={subCommand}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted dark:hover:bg-gray-700 flex items-center space-x-2"
                      onClick={() => onSelect(subCommand)}
                    >
                      <command.icon className="w-4 h-4" />
                      <span>{subCommand}</span>
                    </button>
                  ))}
                </>
              ) : (
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted dark:hover:bg-gray-700 flex items-center space-x-2"
                  onClick={() => onSelect(command.label)}
                >
                  <command.icon className="w-4 h-4" />
                  <span>{command.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

