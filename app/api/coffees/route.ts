import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({message: 'hello!'})
}

export async function POST(request: Request) {
    const body = await request.json();
}