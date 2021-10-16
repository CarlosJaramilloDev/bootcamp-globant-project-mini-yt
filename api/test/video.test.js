const request = require('supertest')
const path = require('path')
const fs = require('fs');
const app = require('../src/app')
const directory = './uploads/';

const cleanFolder = async() => {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
    
        for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
        });
        }
    });
}

beforeEach(async () => {
    await cleanFolder()
})

afterEach(async () => {
    await cleanFolder()
})

test('LoadVideos', async () => {
    await request(app).get('/videos').send({}).expect(200)
})

test('LoadVideosWithParameters', async () => {
    await request(app).get('/videos').send('This is a criteria').expect(200)
})

test('LoadVideoBadObjectId', async () => {
    await request(app).get('/videos/aaaaa').send().expect(500)
})

test('LoadVideoFakeObjectId', async () => {
    await request(app).get('/videos/6169edb1af3436aaaaaaaaaa').send().expect(404)
})

test('IncrementLikesValidOperation', async () => {
    await request(app).patch('/videos/6169edb1af3436aaaaaaaaaa/likes').send().expect(404)
})

test('IncrementLikesInvalidOperation', async () => {
    await request(app).patch('/videos/6169edb1af3436aaaaaaaaaa/likesw').send().expect(400)
})

test('UploadVideoBadFormat', async () => {
    const filePath = path.join(__dirname, 'video.test.js');
    await request(app).post('/upload').
    attach('fileupload', filePath)
    .field('title', 'Demo title')
    .field('tags', [1, 2, 5]).expect(400)
})

test('UploadVideoRightFormat', async () => {
    const filePath = path.join(__dirname, 'sample-mp4-file.mp4');
    await request(app).post('/upload').
    attach('fileupload', filePath)
    .field('title', 'Demo title')
    .field('tags', [1, 2, 5]).expect(201)
})