// This component is using demo logic and will be implemented soon.
// Author: SnowyJS (https://snowyjs.lol)

'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const staffData = [
  { name: 'Snowy', avatar: '/placeholder.svg', score: 245 },
  { name: 'Siec', avatar: '/placeholder.svg', score: 212 },
  { name: 'Andre', avatar: '/placeholder.svg', score: 150 },
  { name: 'Invis', avatar: '/placeholder.svg', score: 75 },
  { name: 'SuperHacka66', avatar: '/placeholder.svg', score: 50 },
]

export function StaffPodium() {
  const podiumOrder = [0, 1, 2]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Monthly Ranking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-end mb-8">
          {podiumOrder.map((index, position) => (
            <motion.div
              key={staffData[index].name}
              
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: position * 0.2 }}
            >
              <div className={`w-1/3 px-2 flex flex-col items-center`}>
                <Avatar className="w-16 h-16 mb-2">
                  <AvatarImage src={staffData[index].avatar} />
                  <AvatarFallback>{staffData[index].name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center mb-2">
                  <p className="font-bold">{staffData[index].name}</p>
                  <p className="text-sm text-muted-foreground">{staffData[index].score} pts</p>
                </div>
                <div 
                  className={`w-full bg-primary rounded-t-lg`} 
                  style={{ height: `${(3 - position) * 40 + 60}px` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="space-y-2">
          {staffData.slice(3).map((staff, index) => (
            <motion.div 
              key={staff.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (index + 3) * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 text-muted-foreground">{index + 4}.</span>
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src={staff.avatar} />
                    <AvatarFallback>{staff.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{staff.name}</span>
                </div>
                <span>{staff.score} pts</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

