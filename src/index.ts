import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import router from './routes'
import { User } from './models/user'
import { createServer } from 'node:http';
import initializeSocket from './utils/websocket'

dotenv.config()

const app = express()
const server = createServer(app)

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/api/confirm', async (req, res) => {
    const token = req.query.token;

    const user = await User.findOne({ confirmationToken: token })

    if (!user) {
        return res.status(400).send('Confirmation token is invalid')
    }

    user.isConfirmed = true
    user.confirmationToken = null

    await user.save()

    return res.send('E-mail confirmed successfully')
})

connectDB()
initializeSocket(server)
app.use(express.json())
app.use('/api', router)
const port = process.env.PORT

server.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`)
})