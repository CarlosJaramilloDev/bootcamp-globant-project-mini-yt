const path = require('path')
const express = require('express')
const hbs = require('hbs')
/* const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') */

const app = express()
const port = process.env.POST || 4000

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/upload-video', (req, res) => {
    res.render('upload-video')
})

app.get('/search', (req, res) => {
    res.render('search')
})

app.get('/video', (req, res) => {
    res.render('video')
})

app.get('*', (req, res) => {
    res.render('error')
})

app.listen(port, () => {
    console.log('Front server running');
})