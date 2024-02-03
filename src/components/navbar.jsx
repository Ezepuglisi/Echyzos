import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'

const Navbar = ({user}) => {
    return (
        <nav className='bg-white w-full p-2 flex gap-2 items-center justify-around'>

            <div className='flex items-center gap-2'>
                <FaUser />
                <p>Veronica</p>
            </div>

            <div className='flex items-center gap-2'>
                <Link className='hover:bg-[#eef4ee] p-2 rounded-md' href={'/admin/add-product'}>Agregar productos</Link>
                <Link className='hover:bg-[#eef4ee] p-2 rounded-md' href={'/admin/view-products'}>Lista de productos</Link>
            </div>

        </nav>
    )
}

export default Navbar