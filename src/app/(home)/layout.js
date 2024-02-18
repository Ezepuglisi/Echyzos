import Navbar from "@/components/navbar";
import prisma from "@/libs/db";


export default async function RootLayout({ children }) {

  const tags = await prisma.tag.findMany({})

  return (
      <div>
        <Navbar tags={tags} />
        {children}
      </div>
  )
}
