import React from 'react'
import prisma from '@/libs/db'
import AdminProductsContainer from '@/components/AdminProductsContainer'


const ViewProducts = async () => {

  const products = await prisma.product.findMany({})

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <AdminProductsContainer data={products} />
    </div>
  )
}

export default ViewProducts