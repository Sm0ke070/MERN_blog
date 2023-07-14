import PostModel from '../models/Post.js'

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })
        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}
export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id
        console.log(postId)
        const updatedPost = await PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc: {viewsCount: 1}},
            {returnDocument: 'after'}
        )

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }

        res.json(updatedPost)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статью'
        })
    }
}
export const removePost = async (req, res) => {
    try {
        const postId = req.params.id

        const findPost = await PostModel.findOne({
            _id: postId
        })

        if (findPost) {
            await PostModel.deleteOne(findPost)
            return res.json({
                success: true
            })
        } else {
            return res.status(404).json({message: 'Не удалось удалить статью1'})
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить статью2'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}