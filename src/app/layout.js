import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { FaUser } from "react-icons/fa";

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
          <nav className='bg-white w-full p-2 flex gap-2 items-center justify-around'>

            <div className='flex items-center gap-2'>
              <FaUser />
              <p>Veronica</p>
            </div>

            <div className='flex items-center gap-2'>
              <Link className='hover:bg-[#eef4ee] p-2 rounded-md' href={'/admin/add-product'}>Agregar productos</Link>
              <Link className='hover:bg-[#eef4ee] p-2 rounded-md' href={'/admin/view-products'}>Lista de productos</Link>
            </div>

          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
