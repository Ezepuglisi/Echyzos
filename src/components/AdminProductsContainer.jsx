'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { deleteProduct, getProducts } from '@/actions/product'
import { useRouter } from 'next/navigation'

const AdminProductsContainer = ({ data }) => {

  const [loading, setLoading] = useState(true)
  const [productsDb, setProductsDb] = useState([])
  const router = useRouter()

  const handleDeleteProduct = async (id) => {
    setLoading(true)
    const result = await deleteProduct(id)

    if (result.error) {
      //modal error
      setLoading(false)
      return
    }

    setLoading(false)
    const filterData = productsDb.filter(e => e.id !== id)
    setProductsDb(filterData)

  }

  useEffect(() => {
    setProductsDb(data)
    setLoading(false)
  }, [])


  return (

    <div className='flex flex-row justify-center flex-wrap p-4 gap-2 w-full'>

      {
        loading ?
          <p>Cargando...</p>
          :

          (
            productsDb.length > 0 ?
              productsDb.map((product, index) => {
                return (
                  <div key={index} className='bg-white rounded-md p-2 w-full flex-2 max-w-[450px] flex items-start flex-col justify-around shadow-md'>
                    <p> <span className='font-bold'>Articulo:</span> {product.title}</p>
                    <p> <span className='font-bold'>Descripcion:</span> {product.description}</p>
                    <p className='font-bold'>Precios:</p>
                    {/* <p> <span className='font-bold'>Precio:</span> {product.price} $</p> */}
                    {product.productModels.map((model, i) => {
                      return <p key={i}>{model.modelName}: ${model.price}</p>
                    })}
                    <p> <span className='font-bold'>Unidades:</span> {product.units}</p>
                    <p> <span className='font-bold'>Talles:</span></p>
                    <div className='flex flex-wrap gap-2 m-2'>
                      {product.sizes.map((size, i) => {
                        return <div key={i} className='p-2 rounded-md bg-[#eef4ee]'>{size}</div>
                      })}
                    </div>
                    <p className='font-bold'>Tags:</p>
                    <div className='flex flex-wrap gap-2 m-2'>
                      {product.tags.map((tag, i) => {
                        return <p key={i} className='p-2 rounded-md bg-[#eef4ee]'>{tag.name}</p>
                      })}
                    </div>
                    <p className='font-bold'>Imagenes:</p>
                    <div className='flex flex-wrap flex-col gap-2 m-2'>
                      {/* {product.imgs.map((img, i) => {
                        return <a target='_blank' href={img} key={i}>Imagen {i}</a>
                      })} */}
                      {product.colors.map((element, i) => {
                        return (
                          <div key={i}>
                            <p className='font-bold'>{element.color.name}</p>
                            {element.images.map((img, indexImg) => {
                              return <a key={indexImg} href={img.url}>Imagen {indexImg + 1}</a>
                            })}
                          </div>
                        )
                      })}
                    </div>
                    <div className='flex w-full items-end justify-end gap-2'>
                      <button className='bg-blue-600 text-white p-1 rounded-md disabled:cursor-not-allowed disabled:bg-blue-600/30' onClick={() => router.push(`/admin/edit-product/${product.id}`)}>Editar</button>
                      <button onClick={() => handleDeleteProduct(product.id)} className='bg-red-600 text-white p-1 rounded-md'>Eliminar</button>
                    </div>
                  </div>
                )
              })
              :
              <p>Todavia no hay productos en la base</p>
          )
      }
    </div>
  )
}

export default AdminProductsContainer