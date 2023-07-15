import {validationResult} from "express-validator";

export default function (req, res, next) {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json(err.array())
    }
    next()
}