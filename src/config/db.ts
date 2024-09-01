import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

function connectDB() {
    mongoose.connect(process.env.MONGO_URL as string)

    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.on('open', () => console.log('Connected to the database!'))
}

export default connectDB