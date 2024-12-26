'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import './globals.css'
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const cookies = document.cookie;
    console.log('All cookies:', cookies);
    const staffId = cookies.split('; ').find(row => row.startsWith('staffId='))?.split('=')[1];
    console.log('staffId:', staffId);
    const isSignInPage = window.location.pathname === '/signin';
    if (!staffId && !isSignInPage) {
      window.location.href = '/signin';
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ThemeToggle className="fixed bottom-4 right-4" />
        </ThemeProvider>
      </body>
    </html>
  )
}
