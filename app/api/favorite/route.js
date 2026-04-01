import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const { userId, productId } = await request.json()
        const existing = await prisma.favorite.findUnique({
            where: { userId_productId: { userId, productId } }
        })

        if (existing) {
            await prisma.favorite.delete({
                where: { userId_productId: { userId, productId } }
            })
            return NextResponse.json({ liked: false })
        } else {
            await prisma.favorite.create({ data: { userId, productId } })
            return NextResponse.json({ liked: true })
        }
    } catch (error) {
        return NextResponse.json({ error: "Error Server" }, { status: 500 })
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const productId = searchParams.get("productId")

    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

    if (productId) {
        const favorite = await prisma.favorite.findUnique({
            where: { userId_productId: { userId, productId } }
        })
        return NextResponse.json({ liked: !!favorite })
    }

    const favorites = await prisma.favorite.findMany({
        where: { userId },
        include: {
            product: true
        },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(favorites.map(f => f.product))
}