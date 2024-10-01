import { prisma } from "@/prisma/prisma-client";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie } from "@/app/actions/auth";
import { headers } from "next/headers";

export async function OPTIONS() {
    // Устанавливаем CORS заголовки для preflight запроса
    return new Response(null, {
        status: 200,
        headers: {
        'Access-Control-Allow-Origin': '*', // Разрешить все источники
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
    }

export async function POST(request: NextRequest) {
    const {email, password} = await request.json()
    const user = await prisma.user.findUnique({where: {email: email}})
    if(!user) {
        throw new Error('Пользователь не найден')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Неверный пароль')
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const response = NextResponse.json({message: 'Логин успешен', data: {accesToken: accessToken}, headers: {'Access-Control-Allow-Origin': '*', // Разрешить все источники
      'Content-Type': 'application/json',}})
    setAuthCookie(request, response, refreshToken);
}
