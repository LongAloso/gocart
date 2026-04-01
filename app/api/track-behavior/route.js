import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, productId, action } = await request.json();

    if (!userId || !productId || !action) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    if (action === "view") {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      const existingView = await prisma.userBehavior.findFirst({
        where: {
          userId,
          productId,
          action: "view",
          createdAt: { gte: tenMinutesAgo }
        }
      });

      if (existingView) return NextResponse.json({ success: true, message: "Skipped spam" });
    }

    // Lưu hành vi mới
    await prisma.userBehavior.create({
      data: { userId, productId, action }
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Track API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}