'use server'
import prisma from "@/libs/db"


export const getTags = async () => {
    try{
        const tags = await prisma.tag.findMany({})

        return tags
    }catch(err){
        console.log(err)
        return {error:true}
    }

}