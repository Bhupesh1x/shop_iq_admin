import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse("User unauthorized", { status: 401 });

    if (!name?.trim())
      return new NextResponse("Name is required", { status: 400 });

    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
