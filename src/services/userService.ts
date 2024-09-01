import { IUser } from "../interfaces/user";
import { User } from "../models/user";
import bcrypt from 'bcrypt'
import { sendConfirmationEmail } from "../utils/sendEmail";
import { generateToken } from "../utils/generateToken";
import CustomError from "../utils/customError";
import { HttpStatus } from "../utils/enums";

const saltRounds = 10;

export const login = async (userData: Pick<IUser, 'email' | 'password'>) => {

    const { password, email } = userData

    const user = await User.findOne({ email })

    if (!user) {
        throw new CustomError(HttpStatus.NOT_FOUND, 'User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password as string)

    if (!isPasswordValid) {
        throw new CustomError(HttpStatus.BAD_REQUEST, 'Incorrect password')
    }

    if (!user?.isConfirmed) {
        throw new CustomError(HttpStatus.BAD_REQUEST, 'Confirm your e-mail to make login')
    }

    const token = generateToken(user?.username as string)

    return token

}

export const create = async (userData: IUser) => {

    const { username, password, email } = userData

    const user = await User.findOne({ email })

    if (user) {
        throw new CustomError(HttpStatus.BAD_REQUEST, 'E-mail already exists')
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const confirmationToken = generateToken(username)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        confirmationToken
    })

    await newUser.save()

    sendConfirmationEmail(email, confirmationToken)
}

