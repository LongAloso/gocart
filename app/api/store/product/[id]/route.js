import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import imagekit from "@/configs/imageKit"
// create the store
export async function PUT(request, { params }) {
    try {
        const { id: productId } = await params

        const formData = await request.formData()

        const name = formData.get("name")
        const description = formData.get("description")
        const mrp = formData.get("mrp")
        const price = formData.get("price")
        const category = formData.get("category")

        const newImages = formData.getAll("images") // file mới
        const existingImages = formData.getAll("existingImages") // ảnh cũ giữ lại

        if (!name || !description || !mrp || !price || !category) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        // giữ ảnh cũ
        let imageUrls = [...existingImages]

        // upload ảnh mới nếu có
        if (newImages.length > 0 && newImages[0].size > 0) {
            for (let img of newImages) {
                const buffer = Buffer.from(await img.arrayBuffer())

                const res = await imagekit.upload({
                    file: buffer,
                    fileName: img.name,
                    folder: "products"
                })

                const url = imagekit.url({
                    path: res.filePath,
                    transformation: [
                        { quality: "auto" },
                        { format: "webp" },
                        { width: "800" }
                    ]
                })

                imageUrls.push(url)
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                mrp: Number(mrp),
                price: Number(price),
                category,
                images: imageUrls
            }
        })

        return NextResponse.json({
            message: "Product updated successfully",
            product: updatedProduct
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}