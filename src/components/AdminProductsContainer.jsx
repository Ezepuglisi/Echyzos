'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { deleteProduct } from '@/actions/product'

const AdminProductsContainer = ({ data }) => {
  // const productsExample = [
  //   {
  //     id: 'b50d981aaa244942b9cb9434029c6910',
  //     title: 'Articulo',
  //     price: 8888,
  //     img: ['https://i.ibb.co/zVK9GSv/DSC-0741-png.png', '', '', ''],
  //     sizes: ['00', '0', '1', '2', '3'],
  //     tags: ['Halloween', 'Patrios'],
  //     units: '3'
  //   }
  // ]

  const [loading, setLoading] = useState(false)
  const [productsDb, setProductsDb] = useState(data)



  /**
   * {
            title: articulo,
            price: Number(precio),
            img: [''],
            sizes: clickedButtons,
            tags: clickedTags,
            units: unidades || null
        }
   */


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

  return (
    <>
      {
        loading ?
          <p>Cargando...</p>
          :
          (
            productsDb.length > 0 ?
              productsDb.map((product, index) => {
                return (
                  <div key={index} className='bg-white rounded-md p-2 min-w-[150px] flex items-start flex-col'>
                    <p>Articulo: {product.title}</p>
                    <p>Precio: {product.price} $</p>
                    <p>Unidades: {product.units}</p>
                    <p>Talles:</p>
                    <div className='flex gap-2 m-2'>
                      {product.sizes.map((size, i) => {
                        return <div key={i} className='p-2 rounded-md bg-[#eef4ee]'>{size}</div>
                      })}
                    </div>
                    <p>Tags:</p>
                    <div className='flex gap-2 m-2'>
                      {product.tags.map((tag, i) => {
                        return <p key={i} className='p-2 rounded-md bg-[#eef4ee]'>{tag.name}</p>
                      })}
                    </div>
                    <p>Imagenes:</p>
                    <div className='flex gap-2 m-2'>
                      {product.imgs.map((img, i) => {
                        return <img key={i} src={img} width={80} />
                      })}
                    </div>
                    <div className='flex w-full items-end justify-end'>
                      <button onClick={() => handleDeleteProduct(product.id)} className='bg-red-600 text-white p-1 rounded-md'>Eliminar</button>
                    </div>
                  </div>
                )
              })
              :
              <p>Todavia no hay productos en la base</p>
          )
      }
    </>
  )
}

export default AdminProductsContainer