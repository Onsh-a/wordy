import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import { router as route } from './routes/api.js';

dotenv.config()
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log(`Connected to Database on port ${process.env.DATABASE_PORT}`))

app.use(express.json())
app.use(cors({
	origin: '*',
	methods: ["POST", "GET", "DELETE", "PATCH"]
}))

app.use('/wordy', route)

app.listen(process.env.DATABASE_PORT, () => console.log('Server Started'))
