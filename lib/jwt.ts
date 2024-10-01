import jwt, { Secret, SignOptions } from 'jsonwebtoken';
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'your_jwt_secret';
const REFRESH_SECRET = process.env.NEXT_PUBLIC_REFRESH_SECRET || 'your_refresh_secret';

type User = {name: string, email: string, password: string, id: number}

export function generateAccessToken(user: User): string {

    const options: SignOptions = {
        expiresIn: '30m'
    }

    return jwt.sign({id: user.id, email: user.email}, JWT_SECRET, options)
}

export function generateRefreshToken(user: User): string {

    const options: SignOptions = {
        expiresIn: '25d'
    }

    return jwt.sign({id: user.id}, REFRESH_SECRET, options)
}

export function verifyAccessToken(token: string): User {
    return jwt.verify(token, JWT_SECRET) as User;
}

export function verifyRefreshToken(token: string): User {
    return jwt.verify(token, REFRESH_SECRET) as User;
}