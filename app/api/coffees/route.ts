import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const coffees = await prisma.coffee.findMany()
    return NextResponse.json(coffees)
}

export async function POST(request: Request) {
    const body = await request.json();
}