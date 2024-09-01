import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import router from './routes'
import { User } from './models/user'

//socket
import { Server } from 'socket.io'
import { createServer } from 'http'
import path from 'path'

dotenv.config()

const app = express()
const port = process.env.PORT

//socket
const server = createServer(app);
const io = new Server(server);
app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message:', msg)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('a user disconnect');
    })
});

io.emit('hello', 'world')
//-------------------------------------------
app.use(cors({
    origin: 'http://localhost:3000',
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
app.use(express.json())
app.use('/api', router)

server.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`)
})