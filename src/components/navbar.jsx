'use client'
import { userStore } from '@/libs/store'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

const Navbar = () => {

    const {user, login, logout} = userStore()

    useEffect(() => {
        console.log(user)
    },[user])


    return (
        <nav className='bg-white w-full p-2 flex gap-2 items-center justify-around'>

            <div className='flex items-center gap-2'>
                
            </div>

            <div className='flex items-center gap-2'>
                    {/* <Link className='hover:bg-[#eef4ee] p-2 rounded-md' href={'/admin/add-product'}>Agregar productos</Link>
                    <Link className='hover:bg-[#eef4ee] p-2 rounded-md' href={'/admin/view-products'}>Lista de productos</Link> */}
            </div>

        </nav>
    )
}

export default Navbar