'use client'
import { getProducts } from "@/actions/product"
import ProductContainer from "@/components/ProductContainer"
import { productStore } from "@/libs/store"
import { useEffect, useState } from "react"


const page = () => {

    const [loading, setLoading] = useState(true)
    // const {loading, setLoading} = productStore()
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
          loading ?
            <p>loading</p>
            :
            <ProductContainer products={data} />
  
        }
      </div>
    )
}

export default page