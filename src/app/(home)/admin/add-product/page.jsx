'use client'
import { useEffect, useState } from 'react'
import FormAddProduct from '@/components/FormAddProduct'
import { getTags } from '@/actions/tags'
import { getModels } from '@/actions/models'
import { getColors } from '@/actions/colors'

const AddProduct = () => {
  const [loading, setLoading] = useState(true)

  const [colors, setColors] = useState([])
  const [models, setModels] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const getDataFromDB = async () => {

      const tags = await getTags()
      const colors = await getColors()
      const models = await getModels()

      if(tags.error || colors.error || models.error){
        setLoading(false)
        return
      }

      setTags(tags)
      setColors(colors)
      setModels(models)

      setLoading(false)

    }

    getDataFromDB()
  }, [])





  return (
    <div className='w-full py-[25px] flex items-center justify-center'>
      <FormAddProduct tags={tags} colores={colors} modelos={models} />
    </div>
  )
}

export default AddProduct