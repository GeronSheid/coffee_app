'use server'

import { prisma } from "@/prisma/prisma-client";

import { setCookie } from 'cookies-next';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function SignUpHandler(data: {
    name: string;
    email: string;
    password: string;
}) {
    const salt = 10;
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

export const setAuthCookie = (req: NextRequest, res: NextResponse, refreshToken: string) => {
    setCookie('refreshToken', refreshToken, {
        req,
        res,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
    })
}

