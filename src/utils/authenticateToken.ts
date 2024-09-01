import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import CustomError from "./customError";
import { HttpStatus } from "./enums";

dotenv.config()

export function authenticateToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
        if (!authHeader) {
            throw new CustomError(HttpStatus.BAD_REQUEST, 'Authorization header not found')
        }

        if (!token) {
            throw new CustomError(HttpStatus.BAD_REQUEST, 'Token not found')
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new CustomError(HttpStatus.BAD_REQUEST, 'Token is expired')
                }

                throw new CustomError(HttpStatus.BAD_REQUEST, 'Token is invalid')
            }

            next()
        })

    } catch (error: any) {
        return res.status(error.statusCode).json({ message: error.message })
    }

}