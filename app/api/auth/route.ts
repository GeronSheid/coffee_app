import { prisma } from "@/prisma/prisma-client";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie } from "@/app/actions/auth";


export async function POST(request: NextRequest) {
    try {
        //Деструктуризируем тело запроса для удобства
        const { email, password } = await request.json()
        //Вытаскиваем юзера из БД по email
        const user = await prisma.user.findUnique({ where: { email: email } })
        //Проверка на существование юзера
        if (!user) {
            return NextResponse.json({ message: 'Пользовательн не найден' }, { status: 404 })
        }
        //Сравниваем хэши паролей
        const isMatch = await bcrypt.compare(password, user.password)
        //Проверка на совпадение паролей у юзеров
        if (!isMatch) {
            return NextResponse.json({ message: 'Неверный пароль', data: {isMatch, user, password} }, { status: 401 })
        }
        //Создаем access и refresh токены
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        //Формируем ответ
        const response = NextResponse.json({ 
            message: 'Вход выполнен', 
            data: { 
                accesToken: accessToken,
                user: {
                    id: user.id,
                    email: user.email
                }
            } 
        })
        //Добавляем куки с refresch токеном к заголовкам ответа
        setAuthCookie(request, response, refreshToken);
        return response;
    } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        return NextResponse.json({ error: 'Произошла ошибка при аутентификации' }, { status: 500 });
    }
}
