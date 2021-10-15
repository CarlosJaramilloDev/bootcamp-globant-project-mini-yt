const express = require('express')
require('./db/mongoose')
const cors = require('cors');
const videoRouter = require('./routers/video')


const app = express()
const port = process.env.POST || 3000

app.use('/uploads', express.static(__dirname + '/../uploads'));
app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.use(videoRouter)

app.listen(port, () => {
    console.log('Server UP');
})

