import React from 'react'
import prisma from '@/libs/db'
import FormAddProduct from '@/components/FormAddProduct'

const AddProduct = async () => {

  const tags = await prisma.tag.findMany({})
  const colors = await prisma.color.findMany({})
  const models = await prisma.model.findMany({})

  // const result = await prisma.tag.create({
  //   data:{
  //     name:'Patrio'
  //   }
  // })

  // const result = await prisma.model.delete({
  //   where:{
  //     id:'8468e481-12d7-4b9a-8877-773093093e36'
  //   }
  // })

  // console.log(result)





  return (
    <div className='w-full py-[25px] flex items-center justify-center'>
      <FormAddProduct tags={tags} colores={colors} modelos={models} />
    </div>
  )
}

export default AddProduct