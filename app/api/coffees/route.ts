import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = (page - 1) * limit
    if(id){
        const coffee = await prisma.coffee.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                coffee_title: true,
                coffee_description: true,
                processing_type: true,
                descriptors: true
            } 
        })
        if(!coffee) {
            return NextResponse.json({error: 'coffee not found'}, {status: 404} );
        }
        return NextResponse.json(coffee)
    }
    const totalCoffes = await prisma.coffee.count()
    const coffees = await prisma.coffee.findMany({
        skip: offset,
        take: limit,
        select: {
            id: true,
            coffee_title: true,
            coffee_description: true,
            processing_type: true,
            descriptors: true
        }    
    })
    return NextResponse.json({
        data: coffees,
        pages: {
            total: Math.ceil(totalCoffes / limit),
            current: page,
        },
        limit: limit,
        totalCoffes: totalCoffes,

    })
}

export async function POST(request: Request) {
    try {   
        const { coffee_title, coffee_description, descriptors, processing_type} = await request.json()
        const newCoffee = await prisma.coffee.create({
            data: {
                coffee_title,
                coffee_description,
                descriptors,
                processing_type
            },
        })
        return NextResponse.json({message: 'Кофе добавлен', coffee: newCoffee})
    } catch (e) {
        return NextResponse.json({message: 'Ошибка при добавлении кофе', error: e}, {status: 500})
    }
}