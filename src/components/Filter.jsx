'use client'

import { productStore } from "@/libs/store"

const Filter = ({ data }) => {

  const { productsDb, setProductsDb, setProducsFiltered, productsFiltered, filtro, setFiltro } = productStore()

  const handleFilterBytag = (tagId) => {

    if(tagId === filtro){
      setFiltro('')
      setProducsFiltered([])
      return
    }

    const filtered = productsDb.filter((disfraz) => {
      return disfraz.tags.find(e => e.id === tagId)
    })

    setProducsFiltered(filtered)
    setFiltro(tagId)
  }



  return (
    <div className='hidden lg:flex w-full justify-center gap-6 bg-white shadow-md border py-1'>
      {data.map((tag, index) => {
        return <p onClick={() => handleFilterBytag(tag.id)} key={index} className={`${filtro === tag.id && 'bg-green-200'} text-xs hover:bg-green-200 px-2 py-1 rounded-md cursor-pointer transition-all`}>{tag.name}</p>
      })}
    </div>
  )
}

export default Filter