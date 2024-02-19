'use server'
import prisma from "@/libs/db"


export const getColors = async () => {
    try{
        const colors = await prisma.color.findMany({})

        return colors
    }catch(err){
        console.log(err)
        return {error:true}
    }

}