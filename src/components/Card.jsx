'use client'
import { traductorColores } from '@/utils/utils'
import React, { useEffect, useState } from 'react'

const Card = ({ props }) => {

    const { title, description, productModels, colors } = props
    const [priceToDisplay, setPriceToDisplay] = useState()
    const [imgToDisplay, setImgToDisplay] = useState(null)


    useEffect(() => {
        const lowestPrice = productModels.reduce((minPrice, product) => {
            const price = parseFloat(product.price);
            return price < minPrice ? price : minPrice;
        }, Infinity);

        setPriceToDisplay(lowestPrice)

        console.log(colors, 'colors')
        if(colors){
            setImgToDisplay(colors[0]?.images[0]?.url)
        }
    }, [])


    return (
        <div className="relative flex max-w-96 w-full max-h-[400px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative h-96 overflow-hidden rounded-t-xl bg-white text-gray-700 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url("${imgToDisplay || '/no-image.jpg'}")`  }}
            >
                {/* <img src={'/prueba.png'} height={500} /> */}
            </div>
            <div className="p-6">
                <div className="mb-2 flex items-center  justify-between">
                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {title}
                    </p>
                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        ${priceToDisplay}
                    </p>
                </div>
                {/* <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                    With plenty of talk and listen time, voice-activated Siri access, and an
                    available wireless charging case.
                </p> */}
                <div className='flex gap-2'>

                    {productModels.map((model) => {
                        if (model.modelName !== 'Único') {
                            return <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75" key={model.id}>{model.modelName}</p>
                        }
                    })}
                </div>
                <div className='flex gap-2 mt-2'>
                    {colors.map((color) => {
                        return <div key={color.id} className='h-4 w-4 border rounded-sm shadow-md' style={{background:traductorColores(color.color.name.toLowerCase())}}></div>
                    })}
                </div>
            </div>
            <div className="p-6 pt-0">
                <button
                    className="bg-green-200 block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                >
                    Agregar al pedido
                </button>
            </div>
        </div>
    )
}

export default Card