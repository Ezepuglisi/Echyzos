'use client'

import { productStore } from "@/libs/store"
import Card from "./Card"
import { useEffect } from "react"

const ProductContainer = ({ products }) => {


    const { productsDb, setProductsDb, productsFiltered } = productStore()

    useEffect(() => {
        setProductsDb(products)
    }, [])



    return (
        <div className="w-full flex flex-wrap gap-8 justify-center">
            {productsDb.length > 0 ?
                (productsFiltered.length > 0 ?
                    productsFiltered.map((prod) => {
                        return <Card key={prod.id} props={prod} />
                    })
                    :
                    productsDb.map((prod) => {
                        return <Card key={prod.id} props={prod} />
                    }))
                :
                <p>No hay productos</p>
            }
        </div>
    )
}

export default ProductContainer