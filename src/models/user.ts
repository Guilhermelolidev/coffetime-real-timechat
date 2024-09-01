import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user'

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    isConfirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: null }
})

export const User = model('User', userSchema)