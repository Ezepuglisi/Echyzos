'use client'
import { addProduct } from '@/actions/product'
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";


const FormAddProduct = ({ tags }) => {


    const talles = ['00', '0', '1', '2', '3']
    // const tags = ['asd']
    const [isSent, setIsSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState({})

    const [clickedButtons, setClickedButtons] = useState([])
    const [clickedTags, setClickedTags] = useState([])
    const [articulo, setArticulo] = useState('')
    const [precio, setPrecio] = useState(0)
    const [unidades, setUnidades] = useState(1)
    const [images, setImages] = useState([])

    const handleTags = (value) => {
        if (clickedTags?.includes(value)) {
            // Si ya ha sido clickeado, lo deseleccionamos

            setClickedTags(clickedTags.filter(index => index.id !== value.id));
        } else {
            // Si no ha sido clickeado, lo seleccionamos
            setClickedTags([...clickedTags, value]);
        }
    }

    const handleSubmit = async () => {


        if (isNaN(precio) || isNaN(unidades) || articulo.length < 3 || clickedTags.length == 0) {
            setErrors((prevState) => ({
                ...prevState,
                ['precio']: isNaN(precio),
                ['unidades']: isNaN(unidades),
                ['articulo']: articulo.length < 3,
                ['tags']: clickedTags.length == 0
            }))
            return
        }

        setIsLoading(true)

        const newObject = {
            title: articulo,
            price: Number(precio),
            img: [''],
            sizes: clickedButtons,
            tags: clickedTags,
            units: unidades || null
        }

        console.log(newObject)

        const result = await addProduct(newObject)

        if (result.error) return setError(true)

        setIsLoading(false)
        setIsSent(true)

    }

    const handleClick = (value) => {
        // Comprueba si el botón ya ha sido clickeado
        if (clickedButtons.includes(value)) {
            // Si ya ha sido clickeado, lo deseleccionamos
            setClickedButtons(clickedButtons.filter(index => index.toString() !== value));
        } else {
            // Si no ha sido clickeado, lo seleccionamos
            setClickedButtons([...clickedButtons, value]);
        }
    }


    const toggleIsSent = () => {
        setIsSent(!isSent)
    }

    useEffect(() => {

        console.log(errors)

    }, [errors])

    const handleInputFile = async (file) => {
        console.log(file);

        const url = `https://api.imgbb.com/1/upload?key=29b61eed492c841ec1877a4cc1b45be9&name=${articulo.length > 0 ? articulo + '.jpg' : file.name}`

        const formData = new FormData()

        formData.append('image', file)

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })


            const responseData = await response.json()

            setImages([...images, responseData.data.url])

            console.log(responseData)

        } catch (error) {
            console.log(error)
        }


    }

    const deleteImage = (img) => {
        const filterImages = images.filter(el => el !== img)

        setImages(filterImages)
    }



    return (
        <div className="space-y-4 border-2 p-10 rounded-lg text-black bg-[#FFF] shadow-[#7a628c33] shadow-md w-full max-w-[700px]">
            {isLoading ?
                <p className='w-full'>cargando...</p>
                :
                <>

                    {
                        isSent ?
                            <div>
                                <p>Enviado correctamente</p>
                                <button onClick={() => toggleIsSent()}>Agregar otro</button>
                            </div>
                            :
                            <>
                                <div>
                                    <label htmlFor="articulo" className="block font-medium ">
                                        Artículo
                                    </label>
                                    <input
                                        type="text"
                                        id="articulo"
                                        className="w-full border rounded-md p-2 text-black"
                                        value={articulo}
                                        onChange={(e) => setArticulo(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="precio" className="block font-medium ">
                                        Precio
                                    </label>
                                    <input
                                        type="text"
                                        id="precio"
                                        className={`w-full border rounded-md p-2 text-black ${errors.precio && 'border-red-600'}`}
                                        value={precio === 0 ? '' : precio}
                                        onChange={(e) => {
                                            setPrecio(e.target.value),
                                                setErrors((prevState) => ({
                                                    ...prevState,
                                                    ['precio']: false,
                                                }))
                                        }}
                                    />
                                    {errors.precio && <p className='text-red-600'>Esto debe ser un número</p>}

                                </div>
                                <div>
                                    <label htmlFor="unidades" className="block font-medium ">
                                        Unidades
                                    </label>
                                    <input
                                        type="text"
                                        id="unidades"
                                        className={`w-full border rounded-md p-2 text-black ${errors.unidades && 'border-red-600'}`}
                                        value={unidades === 0 ? '' : unidades}
                                        onChange={(e) => {
                                            setUnidades(e.target.value),
                                                setErrors((prevState) => ({
                                                    ...prevState,
                                                    ['unidades']: false,
                                                }))
                                        }}
                                    />
                                    {errors.unidades && <p className='text-red-600'>Esto debe ser un número</p>}
                                </div>
                                <div className='flex flex-col'>
                                    <p className="block font-medium ">
                                        Etiquetas
                                    </p>
                                    <div className={`flex flex-wrap gap-2`}>
                                        {tags?.length > 0 && tags.map((el, index) => {
                                            return <div key={index} onClick={() => {
                                                handleTags(el),
                                                    setErrors((prevState) => ({
                                                        ...prevState,
                                                        ['tags']: false,
                                                    }))
                                            }} className={`p-1 border-2 rounded-md ${clickedTags.includes(el) && 'bg-yellow-100 text-black'} cursor-pointer hover:bg-yellow-100/80`}>
                                                <p>{el.name}</p>
                                            </div>
                                        })}

                                    </div>
                                    {errors.tags && <p className='text-red-600'>Debes seleccionar una etiqueta</p>}
                                </div>
                                <div>
                                    <label htmlFor="talles" className="block font-medium ">
                                        Talles
                                    </label>

                                    <div className='flex items-center mt-2 text-white'>
                                        {
                                            talles.map((item, index) => {
                                                return (
                                                    <button
                                                        key={index}
                                                        className={`min-w-10 mr-2 p-1 border-2 rounded-md ${clickedButtons.includes(item) && 'bg-yellow-100'} text-black cursor-pointer hover:bg-yellow-100/80`}
                                                        onClick={() => handleClick(item)}
                                                    >
                                                        {item}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                <div>
                                <label htmlFor="imagenes" className="block font-medium ">
                                        Imagenes
                                    </label>

                                    <div className='flex my-2 gap-2'>
                                    {images.map((el,i) => {
                                        return (
                                            <div className='flex gap-2 items-start border-2 p-2' key={i}>
                                                <img src={el} width={'100px'} />
                                                <button className='bg-red-500 text-white font-semibold p-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed' onClick={() => deleteImage(el)}><MdDeleteOutline /></button>
                                            </div>
                                        )
                                    })}
                                    </div>
                                    {images.length < 4 && <input type='file' onChange={(e) => handleInputFile(e.target.files[0])} />}
                                </div>
                                <div>
                                    <button
                                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed"
                                        onClick={() => handleSubmit()}
                                        disabled={precio.length <= 0 || articulo.length <= 0 || (unidades ? (unidades <= 0) : false)}
                                        style={{}}
                                    >
                                        Enviar
                                    </button>
                                </div>
                                {error && <p className='text-center text-red-700 font-semibold'>Hubo un error</p>}
                            </>
                    }
                </>
            }

        </div>
    )
}

export default FormAddProduct