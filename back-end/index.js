import express from "express";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

mongoose
    .connect('mongodb+srv://smoke070:qqqqqq@cluster1.bbwa56v.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB connect OK'))
    .catch((err) => console.log('DB Error12', err))

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('hello')
})
app.post('/auth/login', (req, res) => {
    console.log(req.body)
    const token = jwt.sign({
        email: req.body.email,
        firstName: "Vasya"
    }, "secret123")

    res.json({
        success: true,
        token
    })
})
app.listen(4444, (err) => {
    if (err) {
        console.log('ERROR')
    } else {
        console.log('server OK')
    }
})