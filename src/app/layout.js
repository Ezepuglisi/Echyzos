import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Echyzos',
  description: 'Echyzos disfraces',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='flex flex-col h-screen items-center justify-start'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
