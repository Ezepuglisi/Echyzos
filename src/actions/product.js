'use server'
import prisma from "@/libs/db"

export const addProduct = async (product) => {
    try{
        const result = await prisma.product.create({
            data:product
        })

        return result
    }catch(error){
        return error
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