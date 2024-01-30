import React from 'react'
import prisma from '@/libs/db'
import FormAddProduct from '@/components/FormAddProduct'

const AddProduct = async () => {

  const tags = await prisma.tag.findMany({})

  // const result = await prisma.tag.create({
  //   data:{
  //     name:'Navidad'
  //   }
  // })

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <FormAddProduct tags={tags} />
    </div>
  )
}

export default AddProduct