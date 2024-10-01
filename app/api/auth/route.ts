import { prisma } from "@/prisma/prisma-client";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie } from "@/app/actions/auth";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) {
            return NextResponse.json({ message: 'Пользовательн не найден' }, { status: 404 })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        console.log(user.password)
        if (!isMatch) {
            return NextResponse.json({ message: 'Неверный пароль', data: {isMatch, user, password} }, { status: 401 })
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const response = NextResponse.json({ message: 'Логин успешен', data: { accesToken: accessToken } })
        setAuthCookie(request, response, refreshToken);
    } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        return NextResponse.json({ error: 'Произошла ошибка при аутентификации' }, { status: 500 });
    }
}
