import Navbar from "@/components/navbar";


export default async function RootLayout({ children }) {

  return (
      <div>
        <Navbar />
        {children}
      </div>
  )
}
