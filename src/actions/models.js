'use server'
import prisma from "@/libs/db"


export const getModels = async () => {
    try{
        const models = await prisma.model.findMany({})

        return models
    }catch(err){
        console.log(err)
        return {error:true}
    }

}