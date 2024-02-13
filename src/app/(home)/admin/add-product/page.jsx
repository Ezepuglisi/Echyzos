import React from 'react'
import prisma from '@/libs/db'
import FormAddProduct from '@/components/FormAddProduct'

const AddProduct = async () => {

  const tags = await prisma.tag.findMany({})
  const colors = await prisma.color.findMany({})
  const models = await prisma.model.findMany({})

  // const result = await prisma.tag.create({
  //   data:{
  //     name:'Primavera'
  //   }
  // })

  // const result = await prisma.color.delete({
  //   where:{
  //     name:'Fucsia'
  //   }
  // })



  return (
    <div className='w-full py-[25px] flex items-center justify-center'>
      <FormAddProduct tags={tags} colores={colors} modelos={models} />
    </div>
  )
}

export default AddProduct