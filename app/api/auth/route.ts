import { prisma } from "@/prisma/prisma-client";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie } from "@/app/actions/auth";

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
    const response = NextResponse.json({message: 'Логин успешен', data: {accesToken: accessToken}})
    setAuthCookie(request, response, refreshToken);
}


// export async function signInHandler(data: {email: string, password: string}) {
//     const {email, password} = data;
//     const user = await prisma.user.findUnique({ where: {email: email}})
//     if(!user) {
//         throw new Error('Пользователь с этим email не обнаружен')
//     }
//     const isMatch = await bcrypt.compare(password, user.password)
//     if(!isMatch) {
//         throw new Error('Неправильный пароль')
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);


//     const res = NextResponse.json({message: 'Успешно', })
//     setAuthCookie()
// }