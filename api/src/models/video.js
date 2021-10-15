const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: Array,
        lowercase: true,
        trim: true,
        default: []
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        default: 0,
        required: true
    },
    file: {
        type: String,
        default: ''
    }
},{
    timestamps: true
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video