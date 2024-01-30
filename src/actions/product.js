'use server'
import prisma from "@/libs/db"

export const addProduct = async (product) => {

    console.log(product)

    try{
        const result = await prisma.product.create({
            data:{
                title:product.title,
                price:product.price,
                imgs:product.imgs,
                sizes:product.sizes,
                units:product.units,
                is_promoted:product.is_promoted,
                tags:{
                    connect:product.tags
                }
            }
        })

        return result
    }catch(error){
        console.log(error)
        return {
            error:'Hubo un error',
            mesage:JSON.stringify(error)
        }
    }
}

export const deleteProduct = async (id) => {
    try{
        const result = await prisma.product.delete({
            where:{
                id:id
            }
        })

        return result
    }catch(error){
        return {
            error:'El producto no existe'
        }
    }
}