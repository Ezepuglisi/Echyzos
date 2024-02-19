import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await prisma.product.findMany({
            include: {
                productModels: true,
                colors: {
                    include: {
                        color: true,
                        images: true
                    }
                },
                tags: true,
                generalImages: true
            }
        })

        console.log(result)
        return NextResponse.json({ result }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }

}