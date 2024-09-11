import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const coffees = await prisma.coffee.findMany({
        select: {
            id: true,
            coffee_title: true,
            coffee_description: true,
            processing_type: true,
            descriptors: true
        }
    })
    return NextResponse.json(coffees)
}

export async function POST(request: Request) {
    const body = await request.json();
}