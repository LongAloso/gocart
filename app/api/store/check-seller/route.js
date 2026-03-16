import authSeller from "@/middlewares/authSeller"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
// Check Seller
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

        if(isSeller) {
            const storeInfo = await prisma.store.findUnique({where: {userId}})
            return NextResponse.json({isSeller, storeInfo})
        }
    } catch (error) {
        
    }
}