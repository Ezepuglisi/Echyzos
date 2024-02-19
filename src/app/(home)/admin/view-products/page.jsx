'use client'
import { getProducts } from '@/actions/product'
import AdminProductsContainer from '@/components/AdminProductsContainer'
import { useEffect, useState } from 'react'


const ViewProducts = () => {

  // const products = await prisma.product.findMany({
  //   include: {
  //     productModels: true,
  //     colors: {
  //       include: {
  //         color: true,
  //         images: true
  //       }
  //     },
  //     tags: true,
  //     generalImages: true
  //   }
  // })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getProductsFromDB = async () => {
      const result = await getProducts()

      if(result.error){
        setLoading(false)
        return
      }

      setData(result)
      setLoading(false)

    }

    getProductsFromDB()
  }, [])

  return (
    <div className='w-full'>
      {
        loading ?
        <p>loading</p>
        :
        <AdminProductsContainer data={data} />

      }
    </div>
  )
}

export default ViewProducts