import ProductContainer from "@/components/ProductContainer"
import prisma from "@/libs/db"


export default async function Home() {

  const products = await prisma.product.findMany({
    include: {
      productModels: true,
      colors: {
        include: {
          color: true,
          images: true
        }
      },
      tags: true,
      generalImages: true
    }
  })

  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
        <ProductContainer products={products} />
    </div>
  )
}
