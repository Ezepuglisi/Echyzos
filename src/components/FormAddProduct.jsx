'use client'
import { addProduct, getProduct, getProductsModels, updateProduct } from '@/actions/product'
import { traductorColores } from '@/utils/utils';
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { useParams, useRouter } from 'next/navigation'


const FormAddProduct = ({ tags, colores, modelos}) => {

    const params = useParams()

    const router = useRouter()


    const talles = ['00', '0', '1', '2', '3'];

    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [productExist, setProductExist] = useState(true)

    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});

    const [clickedButtons, setClickedButtons] = useState([]); //TALLES
    const [clickedModels, setClickedModels] = useState([]);
    const [clickedTags, setClickedTags] = useState([]);
    const [articulo, setArticulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [unidades, setUnidades] = useState(1);
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);

    const [productForEdit, setProductForEdit] = useState(null)
    const [productModels, setProductModels] = useState([])
 
    useEffect(() => {

        const asyncGetProduct = async (id) => {
            const result = await getProduct(id)
            const resultModels = await getProductsModels(id)

            if (result && !result.error) {
                setProductForEdit(result)
                setProductModels(resultModels)
            } else {
                setProductExist(false)
                setIsLoading(false)
            }
        }

        if (params.id) {
            asyncGetProduct(params.id)
        } else {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {

        if (productForEdit) {
            setArticulo(productForEdit.title)
            setDescripcion(productForEdit.description)
            setClickedModels(productForEdit.productModels.map((el) => {
                return { id: el.modelId, name: el.modelName, price: el.price }
            }))
            setUnidades(productForEdit.units)
            setClickedTags(productForEdit.tags)
            setClickedButtons(productForEdit.sizes)
            setColors(productForEdit.colors.map((el) => {
                return { id: el.colorId, name: el.color.name, images: el.images }
            }))



            setIsLoading(false)
        }
    }, [productForEdit])

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


        const tagsForConnect = clickedTags.map(tag => ({ tagId: tag.id }));
        const modelsForConnect = clickedModels.map(model => ({ modelId: model.id, price: model.price, modelName: model.name }));
        const colorsForConnect = colors.map(color => ({ colorId: color.id, images: color.images }));
        const generalImages = images.map(url => ({ url }));

        const newObject = {
            title: articulo,
            description: descripcion,
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
        console.log(productModels)




        try {

            const result = params.id ? await updateProduct(productForEdit.id, newObject) : await addProduct(newObject)
            // setIsLoading(false);


            if (result.error) {
                setError(true);
            } else {
                // if(params.id){
                router.push('/admin/view-products')
                // }else{
                //     setIsSent(true);
                // }
            }
        } catch (error) {
            console.log('entra al catch')
            console.log(error)
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
                if (el.id === destination.id) {
                    if (el.images) {
                        const arrayImages = el.images
                        arrayImages.push({ url: responseData.data.url })
                        return { ...el, images: arrayImages }
                    } else {
                        // const newProperty = [url]
                        return { ...el, images: [{ url: responseData.data.url }] }
                    }

                } else {
                    return el
                }
            })

            setColors(updatedColors)

            // setImages([...images, responseData.data.url]);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteImage = (img, index) => {
        const updatedImages = colors[index].images.filter(el => el.id !== img.id);
    
        // Actualiza el objeto colors en la posición index con las imágenes filtradas
        colors[index].images = updatedImages;
    
        // Filtra el array de colores para eliminar el color en la posición index y luego agregarlo al final
        const filteredColors = colors.filter((c, i) => i !== index);
        filteredColors.push(colors[index]);
    
        // Actualiza el estado con los colores filtrados y el color modificado
        setColors(filteredColors);
    };



    return (
        <div className="space-y-4 border-2 p-10 rounded-lg text-black bg-[#FFF] shadow-[#7a628c33] shadow-md w-full max-w-[700px]">

            {
                productExist ?
                    (isLoading ?
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
                                                            if (isNaN(e.target.value)) return
                                                            const updatedModels = clickedModels.map((el) => {
                                                                if (el.id === item.id) {
                                                                    return { ...el, price: Number(e.target.value) }
                                                                } else {
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
                                                    }} className={`p-1 border-2 rounded-md ${clickedTags.some(item => item.id === el.id) && 'bg-yellow-100 text-black'} cursor-pointer hover:bg-yellow-100/80`}>
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
                                                                style={{ borderColor: traductorColores(item?.name?.toLowerCase()), background: colors?.some(el => el.id === item.id) && traductorColores(item?.name?.toLowerCase()) }}
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
                                                                        <button className='bg-red-500 text-white font-semibold p-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed' onClick={() => deleteImage(el, index)}><MdDeleteOutline /></button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        {<input type='file' onChange={(e) => handleInputFile(e.target.files[0], item)} />}
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
                    )
                    :
                    <p>El producto no existe</p>
            }

        </div>
    )
}

export default FormAddProduct