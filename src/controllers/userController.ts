import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { HttpStatus } from '../utils/enums'

export const login = async (req: Request, res: Response) => {
    try {
        const token = await userService.login(req.body)

        return res.status(HttpStatus.OK).json({ message: 'User logged successfully', token })

    } catch (error: any) {
        return res.status(error.statusCode).json({ message: error.message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        await userService.create(req.body)

        return res.status(HttpStatus.OK).json({ message: 'User created successfully' })

    } catch (error: any) {
        return res.status(error.statusCode).json({ message: error.message })
    }
}