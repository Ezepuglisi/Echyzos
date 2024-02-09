'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { deleteProduct, getProducts } from '@/actions/product'

const AdminProductsContainer = ({ data }) => {

  console.log(data)

  const [loading, setLoading] = useState(true)
  const [productsDb, setProductsDb] = useState([])


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

    <div className='flex gap-2 justify-around'>

      {
        loading ?
          <p>Cargando...</p>
          :

          (
            productsDb.length > 0 ?
              productsDb.map((product, index) => {
                return (
                  <div key={index} className='bg-white rounded-md p-2 min-w-[150px] flex items-start flex-col justify-around'>
                    <p> <span className='font-bold'>Articulo:</span> {product.title}</p>
                    <p> <span className='font-bold'>Precio:</span> {product.price} $</p>
                    <p> <span className='font-bold'>Unidades:</span> {product.units}</p>
                    <p> <span className='font-bold'>Talles:</span></p>
                    <div className='flex gap-2 m-2'>
                      {product.sizes.map((size, i) => {
                        return <div key={i} className='p-2 rounded-md bg-[#eef4ee]'>{size}</div>
                      })}
                    </div>
                    <p className='font-bold'>Tags:</p>
                    <div className='flex gap-2 m-2'>
                      {product.tags.map((tag, i) => {
                        return <p key={i} className='p-2 rounded-md bg-[#eef4ee]'>{tag.name}</p>
                      })}
                    </div>
                    <p className='font-bold'>Imagenes:</p>
                    <div className='flex flex-col gap-2 m-2'>
                      {/* {product.imgs.map((img, i) => {
                        return <a target='_blank' href={img} key={i}>Imagen {i}</a>
                      })} */}
                    </div>
                    <div className='flex w-full items-end justify-end gap-2'>
                      <button className='bg-blue-600 text-white p-1 rounded-md disabled:cursor-not-allowed disabled:bg-blue-600/30' disabled>Editar</button>
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