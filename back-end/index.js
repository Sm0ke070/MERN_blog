import express from "express"
import multer from "multer"
import mongoose from 'mongoose'
import checkAuth from './utils/checkAuth.js'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";


mongoose
    .connect('mongodb+srv://smoke070:qqqqqq@cluster1.bbwa56v.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connect OK'))
    .catch((err) => console.log('DB Error', err))

const app = express()
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) //FIX
    }
})

const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

//LOGIN
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
//REGISTER
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
//AUTH
app.get('/auth/me', checkAuth, UserController.getMe)
//UPLOAD
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})
//POSTS
app.get('/posts', PostController.getAllPosts)
app.get('/posts/:id', PostController.getOnePost)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.createPost)
app.delete('/posts/:id', checkAuth, PostController.removePost)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.listen(4444, (err) => {
    if (err) {
        console.log('ERROR')
    } else {
        console.log('server OK')
    }
})