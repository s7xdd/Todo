const express = require('express')
const app = express()
const connectDB = require('./controllers/mongoDB')
const path = require('path')

const router = require('./routes')

app.use(express.json())

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Include the methods you support
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use('/api', router)

async function startServer () {
    await connectDB()
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on Port : ${process.env.PORT}`)
    })
}

startServer()
