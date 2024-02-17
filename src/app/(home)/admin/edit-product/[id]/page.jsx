import FormAddProduct from "@/components/FormAddProduct"
import prisma from "@/libs/db"

const editProductPage = async () => {
  const tags = await prisma.tag.findMany({})
  const colors = await prisma.color.findMany({})
  const models = await prisma.model.findMany({})

  

  return (
    <div className='w-full py-[25px] flex items-center justify-center'>
      <FormAddProduct tags={tags} colores={colors} modelos={models} />
    </div>
  )
}

export default editProductPage