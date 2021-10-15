const express = require('express')
const Video = require('../models/video')
const multer  = require('multer')
var path = require('path');
const router = new express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage, limits: {
    fileSize: 150000000
}})

const loadVideos = async (q) => {
    try {
        if(q != undefined){
            const map = q.split(" ").map(element => new RegExp(element, 'i'))
            var videos = await Video.find({ $or: [{ title: { $in: map }}, { tags: { $in: map }}]})
        }else{
            var videos = await Video.find({})
        }
        return {videos, undefined}
    } catch (error) {
        return {undefined, error}
    }
}

router.post('/upload', upload.single('fileupload'), async (req, res) => {
    const video = new Video(req.body)
    video.file = req.file.path
    await video.save()
    res.status(201).send(video)
}, (error, req, res, next) => {
    res.status(400).send(error)
})

router.get('/videos', async (req, res) => {
    const q = req.query.q
    const order = req.query.order || 'updatedAt'
    try {
        const {videos, error} = await loadVideos(q)
        if(error){
            return res.status(500).send(error)
        }
        res.send(videos)
    } catch (error) {
       return error
    }
})

router.get('/videos/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video){
            return res.status(404).send({error: "Video not found"})
        }
        const {videos, error} = await loadVideos(video.tags.join(' '))
        if(error){
            return res.status(500).send(error)
        }
        res.send([video, videos])
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/videos/:id/:op', async (req, res) => {
    try {
        const op = req.params.op
        if(!['likes', 'dislikes'].includes(op)){
            return res.status(400).send("Unrecognized operation")
        }
        const video = await Video.findById(req.params.id)
        video[op] ++
        await video.save() 
        if(!video){
            return res.status(404).send({error: "Video not found"})
        }
        res.send(video)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router