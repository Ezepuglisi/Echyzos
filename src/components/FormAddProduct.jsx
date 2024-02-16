'use client'
import { addProduct } from '@/actions/product'
import { traductorColores } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";


const FormAddProduct = ({ tags, colores, modelos }) => {
    const talles = ['00', '0', '1', '2', '3'];

    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});

    const [clickedButtons, setClickedButtons] = useState([]);
    const [clickedModels, setClickedModels] = useState([]);
    const [clickedTags, setClickedTags] = useState([]);
    const [articulo, setArticulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [unidades, setUnidades] = useState(1);
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);

    const handleTags = (value) => {
        if (clickedTags?.includes(value)) {
            setClickedTags(clickedTags.filter(tag => tag.id !== value.id));
        } else {
            setClickedTags([...clickedTags, value]);
        }
    };

    const handleSubmit = async () => {
        if (isNaN(unidades) || articulo.length < 3 || clickedTags.length === 0) {
            setErrors({
                precio: isNaN(precio),
                unidades: isNaN(unidades),
                articulo: articulo.length < 3,
                tags: clickedTags.length === 0
            });
            return;
        }

        setIsLoading(true);

        console.log(colors, 'colors')

        const tagsForConnect = clickedTags.map(tag => ({ tagId: tag.id }));
        const modelsForConnect = clickedModels.map(model => ({ modelId: model.id, price: model.price }));
        const colorsForConnect = colors.map(color => ({ colorId: color.id, images:color.images }));
        const generalImages = images.map(url => ({ url }));

        const newObject = {
            title: articulo,
            description: descripcion,
            // price: Number(precio),
            sizes: clickedButtons,
            models: modelsForConnect,
            colors: colorsForConnect,
            tags: tagsForConnect,
            units: Number(unidades) || null,
            is_promoted: false,
            stock: 0,
            generalImages
        };


        console.log(newObject)

        try {
            const result = await addProduct(newObject);
            setIsLoading(false);

            if (result.error) {
                setError(true);
            } else {
                setIsSent(true);
            }
        } catch (error) {
            setIsLoading(false);
            setError(true);
        }
    };

    const handleClick = (value) => {
        if (clickedButtons.includes(value)) {
            setClickedButtons(clickedButtons.filter(item => item.toString() !== value));
        } else {
            setClickedButtons([...clickedButtons, value]);
        }
    };

    const handleClickModel = (value) => {
        if (value.name !== 'Único') {
            // Si el modelo clickeado no es "Único"
            if (clickedModels.some(model => model.name === 'Único')) {
                // Si hay algún modelo "Único" en la lista, lo eliminamos
                const filteredModels = clickedModels.filter(model => model.name !== 'Único');
                // Agregamos el modelo clickeado a la lista
                setClickedModels([...filteredModels, value]);
            } else {
                // Si no hay ningún modelo "Único" en la lista, simplemente agregamos el modelo clickeado
                setClickedModels([...clickedModels, value]);
            }
        } else {
            // Si el modelo clickeado es "Único", lo establecemos como único en la lista
            setClickedModels([value]);
        }
    };

    const handleClickColorsAndModels = (value, set, state) => {

        if (value.name !== 'Único') {

            if (state.some(el => el.name === 'Único')) {
                const filtered = state.filter(el => el.name !== 'Único')
                set([...filtered, value])
            } else {
                if (state.some(el => el.name === value.name)) {
                    const filtered = state.filter(el => el.name !== value.name)
                    set(filtered)
                } else {
                    set([...state, value])
                }
            }

        } else {
            set([value])
        }

    };

    const toggleIsSent = () => {
        setClickedButtons([]);
        setErrors({});
        setError(false);
        setClickedTags([]);
        setArticulo('');
        setPrecio(0);
        setUnidades(1);
        setImages([]);
        setIsSent(!isSent);
    };

    const handleInputFile = async (file, destination) => {

        
        // if(destination.value !== 'Único'){
        //     if(!destination.images){
        //         destination.images = []
        //     }
        // }

        console.log(destination)



        
        const url = `https://api.imgbb.com/1/upload?key=29b61eed492c841ec1877a4cc1b45be9&name=${articulo.length > 0 ? articulo + '.jpg' : file.name}`;
        const formData = new FormData();

        formData.append('image', file);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const responseData = await response.json();

            // destination.images.push({url:responseData.data.url})
            const updatedColors = colors.map((el) => {
                if(el.id === destination.id){
                    if(el.images){
                        const arrayImages = el.images
                        arrayImages.push({url:responseData.data.url})
                        return {...el, images:arrayImages}
                    }else{
                        // const newProperty = [url]
                        return {...el, images: [{url:responseData.data.url}]}
                    }
    
                }else{
                    return el
                }
            })
    
            setColors(updatedColors)
         
                // setImages([...images, responseData.data.url]);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteImage = (img) => {
        const filterImages = images.filter(el => el !== img);
        setImages(filterImages);
    };


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
                                    <label htmlFor="articulo" className="block font-medium ">
                                        Descripción
                                    </label>
                                    <textarea
                                        type="text"
                                        id="descripcion"
                                        className="w-full border rounded-md p-2 text-black"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="talles" className="block font-medium ">
                                        Modelo
                                    </label>

                                    <div className='flex flex-wrap gap-1 items-center mt-2 text-white'>
                                        {
                                            modelos?.map((item, index) => {
                                                return (
                                                    <button
                                                        key={index}
                                                        className={`min-w-10 mr-2 p-1 border-2 rounded-md ${clickedModels.some(el => el.id === item.id) && 'bg-yellow-100'} text-black cursor-pointer hover:bg-yellow-100/80`}
                                                        onClick={() => handleClickColorsAndModels(item, setClickedModels, clickedModels)}
                                                    >
                                                        {item.name}
                                                    </button>
                                                )
                                            })
                                        }


                                    </div>

                                </div>
                                {clickedModels?.map((item, index) => {
                                    return (
                                        <div key={index} className='flex gap-2 items-center'>
                                            <p>{item.name}</p>
                                            <input
                                                type="text"
                                                id="precio"
                                                className={`w-full border rounded-md p-2 text-black ${errors.precio && 'border-red-600'}`}
                                                value={((item.price === 0) || (!item.price)) ? '' : item.price}
                                                onChange={(e) => {
                                                    if(isNaN(e.target.value)) return
                                                    const updatedModels = clickedModels.map((el) => {
                                                        if(el.id === item.id){
                                                            return {...el, price:Number(e.target.value)}
                                                        }else {
                                                            return el
                                                        }
                                                    })
                                                    setClickedModels(updatedModels)
                                                }}
                                            />
                                            {errors.precio && <p className='text-red-600'>Esto debe ser un número. Recuerda NO ingresar el signo $</p>}
                                            <label htmlFor="precio" className="block font-medium ">
                                                $
                                            </label>

                                        </div>

                                    )
                                })}
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

                                    <div className='flex flex-wrap gap-1 items-center mt-2 text-white'>
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
                                    <label htmlFor="talles" className="block font-medium ">
                                        Colores
                                    </label>

                                    <div className='flex flex-wrap gap-1 items-center mt-2 text-white'>
                                        {
                                            colores?.map((item, index) => {
                                                return (
                                                    <button
                                                        key={index}
                                                        className={`min-w-10 mr-2 p-1 border-2 rounded-md  text-black cursor-pointer hover:bg-yellow-100/80`}
                                                        onClick={() => handleClickColorsAndModels(item, setColors, colors)}
                                                        style={{ borderColor: traductorColores(item?.name?.toLowerCase()), background: colors.some(el => el.id === item.id) && traductorColores(item?.name?.toLowerCase()) }}
                                                    >
                                                        {item.name}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>

                                </div>

                                {colors?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='border p-2 rounded-lg'
                                            style={{ borderColor: traductorColores(item?.name?.toLowerCase()) }}
                                        >
                                            <p>Color: {item.name} </p>

                                            <div>
                                                <label htmlFor="imagenes" className="block font-medium ">
                                                    Imagenes
                                                </label>

                                                <div className='flex my-2 gap-2'>
                                                    {item.images?.map((el, i) => {
                                                        return (
                                                            <div className='flex gap-2 items-start border-2 p-2' key={i}>
                                                                <img src={el.url} width={'100px'} />
                                                                <button className='bg-red-500 text-white font-semibold p-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed' onClick={() => deleteImage(el)}><MdDeleteOutline /></button>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                { <input type='file' onChange={(e) => handleInputFile(e.target.files[0], item)} />}
                                            </div>

                                        </div>
                                    )
                                })}

                                {/* <div>
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
                                </div> */}
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