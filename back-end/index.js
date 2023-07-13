import express from "express"
import mongoose from 'mongoose'
import checkAuth from './utils/checkAuth.js'
import {registerValidation} from './validations/auth.js'
import * as UserController from './controllers/UserController.js'


mongoose
    .connect('mongodb+srv://smoke070:qqqqqq@cluster1.bbwa56v.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connect OK'))
    .catch((err) => console.log('DB Error', err))

const app = express()
app.use(express.json())


//LOGIN
app.post('/auth/login', UserController.login)

//REGISTER
app.post('/auth/register', registerValidation, UserController.register)

//AUTH
app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
    if (err) {
        console.log('ERROR')
    } else {
        console.log('server OK')
    }
})