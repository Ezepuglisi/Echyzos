import React from 'react'
import prisma from '@/libs/db'
import AdminProductsContainer from '@/components/AdminProductsContainer'


const ViewProducts = async () => {

  const products = await prisma.product.findMany({
    include:{
      tags:true
    }
  })

  const productsWithNumericPrices = products.map((product) => {
    return {
      ...product,
      price: Number(product.price),
    };
  });
  // const tags = await prisma.tag.findMany({})

  // console.log(tags)
  console.log(products)

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <AdminProductsContainer data={productsWithNumericPrices} />
    </div>
  )
}

export default ViewProducts