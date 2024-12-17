'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <div className="backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-800 transition-colors duration-300">
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <p className="text-sm text-muted-foreground flex items-center">
            Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="inline-block mx-1 h-4 w-4 text-red-500" />
              </motion.span>
            by 
            <a 
              href="https://snowyjs.lol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline ml-1"
            >
              Snowy 
            </a>
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

