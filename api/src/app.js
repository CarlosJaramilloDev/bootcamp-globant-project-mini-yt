const express = require('express')
require('./db/mongoose')
const cors = require('cors');
const videoRouter = require('./routers/video')


const app = express()

app.use('/uploads', express.static(__dirname + '/../uploads'));
app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.use(videoRouter)

module.exports = app
