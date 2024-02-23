'use client'

import { traductorColores } from "@/utils/utils"
import { useEffect, useState } from "react"

const ProductDetail = ({ props }) => {

    const { title, description, tags, productModels, colors } = props

    const [imgs, setImgs] = useState([])
    const [imgFocus, setImgFocus] = useState({img:'/no-image.jpg'})
    const [price, setPrice] = useState(null)
    const [colorSelected, setColorSelected] = useState([])

    useEffect(() => {

        const newArray = colors.flatMap((item) => {
            return item.images.map((image) => {
                return { colorId: item.colorId, img: image.url };
            });
        });

        setImgs(newArray)
        if (newArray?.length > 0) {
            setImgFocus(newArray[0])
        }

        console.log(colors, 'COLORS')
        if (productModels?.length > 0)
            setPrice(productModels[0].price)



    }, [])


    const handleColorAndImg = (colorid) => {
        const imgFiltrada = imgs.find(e => e.colorId === colorid)
        const selectedColor = colors.find(e => e.colorId === colorid)

        if (selectedColor) {

            const isColorAlreadySelected = colorSelected.find(e => e.colorId === colorid)

            if(isColorAlreadySelected){
                const filteredColors = colorSelected.filter(e=> e.colorId !== colorid)
                setColorSelected(filteredColors)
            }else{
                setColorSelected([...colorSelected, selectedColor])
            }

        }

        if (imgFiltrada) {
            setImgFocus(imgFiltrada)
        }
    }

    const handleImgFocus = (condition) => {

        if(imgs.length === 0) return

        const index = imgs.indexOf(imgFocus)

        console.log(index)
        console.log(imgs.length)

        if (condition) {

            if (index === imgs.length - 1) {
                setImgFocus(imgs[0])
                return
            }

            setImgFocus(imgs[index + 1])
        } else {
            if(index === 0){
                setImgFocus(imgs[imgs.length - 1])
                return
            }
            setImgFocus(imgs[index - 1])
        }

    }



    return (
        <section className="md:py-10 font-poppins p-2">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4 bg-white rounded-md">
                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                        <div className="sticky top-0 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10 lg:h-96">
                                <div className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2 cursor-pointer" onClick={() => handleImgFocus(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-green-800 bi bi-chevron-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z">
                                        </path>
                                    </svg>
                                </div>
                                <img className="object-contain w-full lg:h-full" src={imgFocus.img} alt="" />
                                <div className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2 cursor-pointer" onClick={() => handleImgFocus(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-green-800 bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-wrap hidden -mx-2 md:flex">
                                {imgs?.map((item, index) => {
                                    return <div className="w-1/2 p-2 sm:w-1/4" key={index}>
                                        <div className="block border border-gray-200 hover:border-green-400 cursor-pointer" onClick={() => setImgFocus(item)}>
                                            <img className="object-contain w-full lg:h-28" src={item.img} alt="" />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <div className="lg:pl-20">
                            <div className="mb-6 ">
                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl">
                                    {title}
                                </h2>
                                <p className="inline-block text-2xl font-semibold text-gray-700 ">
                                    <span>${price && price}</span>
                                </p>
                                {productModels?.map((el) => {
                                    if (el.modelName === 'Único') return
                                    return <p className='rounded-md bg-[#E9FBF0] shadow p-2 mt-2' key={el.id}>{el.modelName}</p>
                                })}
                            </div>
                            <div className="mb-6">
                                <h2 className="mb-2 text-lg font-bold text-gray-700">Detalle:</h2>
                                <div className="bg-[#E9FBF0] rounded-xl">
                                    <div className="p-3 lg:p-5 ">
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-6 flex gap-2 border-t border-b border-gray-200 flex-wrap">
                                {/* <span className="text-base text-gray-600 ">In Stock</span> */}
                                {tags?.map((tag) => {
                                    return <p className='rounded-md bg-[#E9FBF0] shadow p-2' key={tag.id}>{tag.name}</p>
                                })}
                            </div>
                            <div className="py-6 flex gap-2 border-b border-gray-200 flex-col flex-wrap">
                                <p>Elige los colores:</p>
                                <div className="flex gap-2 flex-wrap">

                                {colors.map((color) => {
                                    return <div onClick={(() => handleColorAndImg(color.colorId))} className={`h-[40px] w-[40px] border shadow-md cursor-pointer ${colorSelected.some(e => e.id == color.id) && 'border-2 border-green-600'}`} style={{ background: traductorColores(color.color.name.toLowerCase()) }} key={color.id}></div>
                                })}
                                </div>

                            </div>
                            <div className="py-6 flex flex-wrap items-center mb-6">
                                <div className="mb-4 mr-4 lg:mb-0">
                                    <div className="w-28">
                                        <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                            <button disabled className="disabled:cursor-not-allowed disabled:opacity-60 w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                                <span className="m-auto text-2xl font-thin">-</span>
                                            </button>
                                            <input disabled className="disabled:cursor-not-allowed disabled:opacity-60 flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black" placeholder="1" />
                                            <button disabled className="disabled:cursor-not-allowed disabled:opacity-60 w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button disabled href="#" className="disabled:cursor-not-allowed disabled:opacity-60 transition-all w-full px-4 py-3 text-center bg-green-200 border border-green-600 hover:bg-green-600 hover:text-gray-100 lg:w-1/2 rounded-xl">
                                    Agregar al pedido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
}

export default ProductDetail