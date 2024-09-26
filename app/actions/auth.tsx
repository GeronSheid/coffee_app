'use server'

import { prisma } from "@/prisma/prisma-client";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

export async function SignInHandler(data: {
    name: string;
    email: string;
    password: string;
}) {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashPassword
        }
    })
    return JSON.stringify({
            message: 'Пользователь успешно зарегестрирован',
            user: newUser
        })
}

export async function signInHandler(data: {email: string, password: string}) {
    const {email, password} = data;
    const user = await prisma.user.findUnique({ where: {email: email}})
    if(!user) {
        throw new Error('Пользователь с этим email не обнаружен')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Неправильный пароль')
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    
}