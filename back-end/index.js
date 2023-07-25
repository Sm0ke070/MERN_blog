import express from "express"
import multer from "multer"
import mongoose from 'mongoose'
import {loginValidation, postCreateValidation, registerValidation} from './validations.js'
import {UserController, PostController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'
import cors from "cors";

//'mongodb+srv://smoke070:qqqqqq@cluster1.bbwa56v.mongodb.net/blog?retryWrites=true&w=majority'  FIX

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connect OK'))
    .catch((err) => console.log('DB Error', err))
//process.env.MONGODB_URI
const app = express()
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname) //FIX
    }
})

const upload = multer({storage})

app.use(express.json())
app.use(cors())
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

app.get('/tags', PostController.getLastTags)

//POSTS FIX
app.get('/posts', PostController.getAllPosts)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOnePost)
app.post('/posts', checkAuth, postCreateValidation, PostController.createPost) //handleValidationErrors FIX
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.removePost)


//process.env.PORT || 4444
app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        console.log('ERROR')
    } else {
        console.log('server OK')
    }
})

module.exports = app