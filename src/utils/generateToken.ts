import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function generateToken(username: string) {
    const payload = {
        username
    }

    const secret = process.env.JWT_SECRET as string

    const options = {
        expiresIn: process.env.TOKEN_EXPIRATION
    };

    const token = jwt.sign(payload, secret, options)

    return token
}