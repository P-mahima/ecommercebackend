const express = require('express')
const app = express()
const connectToDB = require("./config/MongoBd")
const router = require('./route/route')
require('dotenv').config()
const cors = require('cors')

app.use(express.json())

app.use(cors({
    origin:'*'
}))

app.use("/route", router)
app.get('/payment' , (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_KEY)
})
app.get('/', (req, res) => res.send('Hello World!'))

const startConnection = async ()=>{
    try{
        await connectToDB(process.env.MONGO_URL);
        app.listen(3005, () => console.log('server live in port 3005'))
    }
    catch(err){
        console.log();
    }
}

startConnection();