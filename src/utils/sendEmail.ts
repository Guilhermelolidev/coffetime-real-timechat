import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import CustomError from './customError'
import { HttpStatus } from './enums'

dotenv.config()

const email = process.env.EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: process.env.EMAIL_PASSWORD_APP
    }
})

export function sendConfirmationEmail(userEmail: string, confirmationToken: string) {
    const mailOptions = {
        from: email,
        to: userEmail,
        subject: 'Confirm your e-mail address please!',
        html: `<p>Olá,</p>
               <p>Please, Please confirm your email by clicking the link below:</p>
               <a href="http://localhost:3001/api/confirm?token=${confirmationToken}">Confirm your e-mail :)</a>`
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            throw new CustomError(HttpStatus.BAD_REQUEST, `Error when sending the email: ${error}`)
        }

        console.log('E-mail confirmation was sent!')
    })
}