import Navbar from '@/components/navbar'

export default function RootLayout({ children }) {
    return (
    <div className='flex flex-col h-screen items-center justify-start'>
        <Navbar />
            {children}
    </div>

    )
  }