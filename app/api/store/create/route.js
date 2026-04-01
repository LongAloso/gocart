import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import imagekit from "@/configs/imageKit"
// create the store
export async function POST(request) {
    try {
        const {userId} = getAuth(request)
        // Get the data from the form
        const formData = await request.formData()

        const name = formData.get("name")
        const username = formData.get("username")
        const description = formData.get("description")
        const email = formData.get("email")
        const contact = formData.get("contact")
        const address = formData.get("address")
        const image = formData.get("image")

        if(!name || !username || !description || !email ||
            !contact || !address || !image) {
                return NextResponse.json({error: "missing store info"}, {status: 400})
            }
            // check is user have already registered a store
            const store = await prisma.store.findFirst({
                where: { userId: userId}
            })

            // if store is already registered then send status of store
            if(store) {
                return NextResponse.json({status:store.status})
            }
            
            // check is username is already taken
            const isUsernameTaken = await prisma.store.findFirst({
                where: { username: username.toLowerCase()}
            })

            if(isUsernameTaken) {
                return NextResponse.json({error: "username already taken"}, {status:400})
            }

            //image upload to imagekit
            const buffer = Buffer.from(await image.arrayBuffer());
            const response = await imagekit.upload({
                file: buffer,
                fileName: image.name,
                folder: "logos"
            })
            
            const optimizedImage = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '512' }
                ]
            })
            const newStore = await prisma.store.create({
                data: {
                    userId,
                    name,
                    description,
                    username: username.toLowerCase(),
                    email,
                    contact,
                    address,
                    logo: optimizedImage
                }
            })

            // link store to user
            await prisma.user.update({
                where: { id: userId },
                data: { store: {connect: {id: newStore.id}}}
            })
            
            return NextResponse.json({message: "applied, waiting for approval"})



    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.code || error.message}, { status: 400 })
    }
}

// check is user have already registered a store if yes then send status of store

export async function GET(request) {
    try {
        const {userId} = getAuth(request)

        // check is user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId}
        })

        // if store is already registered then send status of store
        if(store) {
            return NextResponse.json({status:store.status})
        }

        return NextResponse.json({status: "not registered"})

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.code || error.message}, { status: 400 })
    }
}

export async function PUT(request) {
    try {
        const { userId } = getAuth(request)
        
        const formData = await request.formData()
        
        const productId = formData.get("productId") 

        const name = formData.get("name")
        const description = formData.get("description")
        const actualPrice = formData.get("actualPrice")
        const offerPrice = formData.get("offerPrice")
        const category = formData.get("category")

        const images = formData.getAll("images") // array 4 ảnh

        // validate
        if (!name || !description || !actualPrice || !offerPrice || !category) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }
        // check is user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId}
        })
        // if store is already registered then send status of store
        if(store) {
            return NextResponse.json({status:store.status})
        }

        // tìm sản phẩm
        const product = await prisma.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        let imageUrls = product.images || []

        // nếu có ảnh mới thì upload
        if (images && images.length > 0 && images[0].size > 0) {
            imageUrls = []

            for (let img of images) {
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

        // update product
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                actualPrice: Number(actualPrice),
                offerPrice: Number(offerPrice),
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
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}