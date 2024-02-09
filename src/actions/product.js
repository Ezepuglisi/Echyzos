'use server'
import prisma from "@/libs/db"

// export const addProduct = async (product) => {

//     try{
//         const result = await prisma.product.create({
//             data:{
//                 title:product.title,
//                 description:product.description || '',
//                 price:product.price,
//                 imgs:product.imgs,
//                 sizes:product.sizes,
//                 model:product.model || [],
//                 units:product.units,
//                 stock:product.stock,
//                 is_promoted:product.is_promoted,
//                 tags:{
//                     connect:product.tags
//                 },
//                 Color:{
//                     connect:product.color
//                 }
                
//             }
//         })

//         return result
//     }catch(error){
//         console.log(error)
//         return {
//             error:'Hubo un error',
//             mesage:JSON.stringify(error)
//         }
//     }
// }

export const addProduct = async (product) => {

    try {
        const result = await prisma.product.create({
            data: {
                title: product.title,
                description: product.description || '',
                units: product.units,
                stock: product.stock,
                sizes:product.sizes,
                is_promoted: product.is_promoted,
                productModels: {
                    create: product.models && product.models.map(model => ({
                        model: { connect: { id: model.modelId } },
                        price: model.price
                    }))
                },
                colors: {
                    create: product.colors && product.colors.map(color => ({
                        color: { connect: { id: color.colorId } },
                        images: {
                            create: color.images && color.images.map(image => ({
                                url: image.url
                            }))
                        }
                    }))
                },
                tags: {
                    connect: product.tags && product.tags.map(tag => ({ id: tag.tagId }))
                },
                generalImages: {
                    create: product.generalImages && product.generalImages.map(image => ({
                        url: image.url
                    }))
                }
            }
        });

        return result;
    } catch (error) {
        console.log(error);
        return {
            error: 'Hubo un error',
            message: JSON.stringify(error)
        };
    }
};

export const deleteProduct = async (id) => {

    console.log('deleteeeee')

    try{
        // Eliminar primero los ProductModel asociados al producto
        await prisma.productModel.deleteMany({
            where: {
                productId: id,
            },
        });

        await prisma.productColor.deleteMany({
            where: {
                productId: id,
            },
        });

        // Luego eliminar el producto principal
        const result = await prisma.product.deleteMany({
            where: {
                id: id,
            },
        });


        console.log(result)

        return result
    }catch(error){

        console.log(error)

        return {
            error:'El producto no existe'
        }
    }
}

export const getProducts = async () => {

}

