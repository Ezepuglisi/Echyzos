'use client'

import Card from "./Card"

const ProductContainer = ({ products }) => {



    return (
        <div className="w-full flex flex-wrap gap-3 justify-center">
            {products.length > 0 ?
                products.map((prod) => {
                    return <Card key={prod.id} props={prod} />
                })
                :
                <p>No hay productos</p>
            }
        </div>
    )
}

export default ProductContainer