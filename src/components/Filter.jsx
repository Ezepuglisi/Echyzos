import React from 'react'

const Filter = ({data}) => {
  return (
    <div className='hidden lg:flex w-full justify-center gap-6 bg-white shadow-md border py-1'>
        {data.map((filtro, index) => {
            return <p key={index} className='text-xs hover:bg-green-200 px-2 py-1 rounded-md cursor-pointer'>{filtro.name}</p>
        })}
    </div>
  )
}

export default Filter