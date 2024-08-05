import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("User unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Storeid is required", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        userId,
        id: params.storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STOREID_PATCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Storeid is required", { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        userId,
        id: params.storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STOREID_DELETE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
