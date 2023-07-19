import {body} from 'express-validator'


export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длинна пароля 5 символов').isLength({min: 5}),
]
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длинна пароля 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите имя').isLength({min: 3}),
    body('avatarUrl', 'Некорректная ссылка на аватар').optional().isString(),
]
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
