import express from "express";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'
import {registerValidation} from './validations/auth.js'
import UserModel from './models/User.js'
import checkAuth from './utils/checkAuth.js'


mongoose
    .connect('mongodb+srv://smoke070:qqqqqq@cluster1.bbwa56v.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connect OK'))
    .catch((err) => console.log('DB Error', err))

const app = express()
app.use(express.json())


//LOGIN
app.post('/auth/login', async (req, res) => {
        try {
            const user = await UserModel.findOne({email: req.body.email})

            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }
            const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

            if (!isValidPass) {
                return res.status(400).json({
                    message: 'Неверный логин или пароль'
                })
            }
            const token = jwt.sign({
                    _id: user.id
                },
                'secret123',
                {
                    expiresIn: '30d'
                }
            )
            const {passwordHash, ...userData} = user._doc
            res.json({
                ...userData,
                token
            })
        } catch
            (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось авторизоваться'
            })
        }
    }
)
//REGISTER
app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json(err.array())
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
            passwordHash: hash,
        })

        const user = await doc.save()

        const token = jwt.sign({
                _id: user.id
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
})

//AUTH
app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const {passwordHash, ...userData} = user._doc
        const token = jwt.sign({
                _id: user.id
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )
        res.json(userData)
    } catch (err) {
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
})

app.listen(4444, (err) => {
    if (err) {
        console.log('ERROR')
    } else {
        console.log('server OK')
    }
})