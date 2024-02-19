import React from 'react'
import prisma from '@/libs/db'
import AdminProductsContainer from '@/components/AdminProductsContainer'


const ViewProducts = async () => {

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
  });


  return (
    <div className='w-full'>
      <AdminProductsContainer data={products} />
    </div>
  )
}

export default ViewProducts