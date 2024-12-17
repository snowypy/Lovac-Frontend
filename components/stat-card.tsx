'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: number
}

export function StatCard({ title, value }: StatCardProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    })

    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < value) {
          return Math.min(prevCount + Math.ceil(value / 100), value)
        }
        clearInterval(interval)
        return value
      })
    }, 20)

    return () => clearInterval(interval)
  }, [value, controls])

  return (
    <motion.div animate={controls}>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{count.toLocaleString()}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

