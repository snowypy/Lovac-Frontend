import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[600px] bg-card/50 backdrop-blur-sm p-6">
          <CardHeader className="flex flex-col items-center space-y-4 pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
            </motion.div>
            <h2 className="text-2xl font-bold text-center">{title}</h2>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
