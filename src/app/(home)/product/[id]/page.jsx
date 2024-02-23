'use client'

import { getProduct } from "@/actions/product"
import ProductDetail from "@/components/ProductDetail"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


const ProductPage = () => {

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [error, setError] = useState(false)


    useEffect(() => {
        const getProductFromDB = async () => {
            const result = await getProduct(params.id)

            console.log(result)

            if (result.error) {
                setLoading(false)
                setError(true)
            }

            setLoading(false)
            setProduct(result)
        }

        getProductFromDB()
    }, [])

    return (
        <>
            {loading ?
                <p>Loading...</p>
                :
                (error ?
                    <p>Hubo un error al procesar la solicitud</p>
                    :
                    <ProductDetail props={product} />)
            }
        </>
    )
}

export default ProductPage