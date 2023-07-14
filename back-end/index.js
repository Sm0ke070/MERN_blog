import express from "express"
import mongoose from 'mongoose'
import checkAuth from './utils/checkAuth.js'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from "./controllers/PostController.js";
import {removePost} from "./controllers/PostController.js";


mongoose
    .connect('mongodb+srv://smoke070:qqqqqq@cluster1.bbwa56v.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connect OK'))
    .catch((err) => console.log('DB Error', err))

const app = express()
app.use(express.json())


//LOGIN
app.post('/auth/login', loginValidation, UserController.login)

//REGISTER
app.post('/auth/register', registerValidation, UserController.register)

//AUTH
app.get('/auth/me', checkAuth, UserController.getMe)

//POSTS
app.get('/posts', PostController.getAllPosts)
app.get('/posts/:id', PostController.getOnePost)
app.post('/posts', checkAuth, postCreateValidation, PostController.createPost)
app.delete('/posts/:id', checkAuth, PostController.removePost)
app.patch('/posts/:id',checkAuth, PostController.update)


app.listen(4444, (err) => {
    if (err) {
        console.log('ERROR')
    } else {
        console.log('server OK')
    }
})