const app = require('./app')
const port = process.env.POST || 3000

app.listen(port, () => {
    console.log('Server UP');
})

