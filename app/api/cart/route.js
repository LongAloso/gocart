import prisma from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


// Update user cart
export async function POST(requests) {
    try {
        const { userId } = getAuth(requests)
        const { cart } = await requests.json()

        // Save the cart to the user object
        await prisma.user.update({
            where: {id: userId},
            data: {cart: cart}
        })

        return NextResponse.json({ message: 'Cart updated'})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

// Get user cart
export async function GET(requests) {
    try {
        const { userId } = getAuth(requests)
        
        const user = await prisma.user.findUnique({
            where: {id: userId}
        })
        return NextResponse.json({ cart: user.cart})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}