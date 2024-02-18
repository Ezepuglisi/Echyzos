'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { MdOutlineClose, MdMenu, MdLogin, MdLogout, MdCart, MdOutlineShoppingCart, MdSearch } from "react-icons/md";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link className='text-sm' href="/">
                            Echyzos
                        </Link>
                    </div>
                    <div className='flex gap-1'>
                        <input className='border rounded-md text-xs px-2' placeholder='Busca en el catalogo...' />
                        <button className='bg-green-200 p-1 rounded-md'>
                            <MdSearch />
                        </button>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <div className='flex gap-1 items-center py-1'>
                            <MdLogin />
                            <p>Iniciar sesion</p>
                        </div>
                        <div className='flex gap-1 items-center py-1'>
                            <MdOutlineShoppingCart />
                            <p>Carrito</p>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <MdOutlineClose />
                            ) : (
                                <MdMenu />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden shadow-md">
                    <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col divide-y">
                        {/* {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                                {item.name}
                            </Link>
                        ))} */}
                        <div className='flex gap-4 items-center py-1'>
                            <MdLogin />
                            <p>Iniciar sesion</p>
                        </div>
                        <div className='flex gap-4 items-center py-1'>
                            <MdOutlineShoppingCart />
                            <p>Carrito</p>
                        </div>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
