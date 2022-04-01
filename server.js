require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log(`Connected to Database on port ${process.env.DATABASE_PORT}`))

app.use(express.json())

const wordyRoutes = require('./routes/api')
app.use('/wordy', wordyRoutes)

app.listen(process.env.DATABASE_PORT, () => console.log('Server Started'))