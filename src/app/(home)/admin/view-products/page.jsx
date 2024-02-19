import React from 'react'
import prisma from '@/libs/db'
import AdminProductsContainer from '@/components/AdminProductsContainer'


const ViewProducts = async () => {

  const getProductsFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'GET'
      });
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null; // O manejar el error de alguna otra manera
    }
  };
  const products = await getProductsFromServer()
console.log('nose')

  return (
    <div className='w-full'>
      <AdminProductsContainer data={products} />
    </div>
  )
}

export default ViewProducts