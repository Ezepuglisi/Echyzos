import { Inter } from 'next/font/google'
import './globals.css'


export const metadata = {
  title: 'Echyzos',
  description: 'Echyzos disfraces',
}

export default async function RootLayout({ children }) {


  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
