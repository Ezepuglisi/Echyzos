'use client'
import ProductContainer from "@/components/ProductContainer"
// import prisma from "@/libs/db"


export default function Home() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getProductsFromDB = async () => {
      const result = await getProducts()

      if (result.error) {
        setLoading(false)
        return
      }

      setData(result)
      setLoading(false)

    }

    getProductsFromDB()
  }, [])



  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      {
        data.length > 0 ?
          <ProductContainer products={data} /> 
          :
          <p>loading</p>
      }
    </div>
  )
}
