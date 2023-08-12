import PostModel from '../models/Post.js'

export const createPost = async (req, res) => {
    try {
        const tags = req.body.tags ? req.body.tags.split(',') : []
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: tags,
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
        let sortBy = req.query.sortBy
        let sortOptions


        if (sortBy === '0') {
            sortOptions = {createdAt: -1}
        } else {
            sortOptions = {viewsCount: -1}
        }

        const posts = await PostModel.find()
            .sort(sortOptions)
            .populate('user')
            .exec()

        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
export const addComment = async (req, res) => {
    try {
        const postId = req.params.id
        const updatedPost = await PostModel.findOneAndUpdate(
            {_id: postId},
            {$push: {comments: req.body}},
            {returnDocument: 'after'}
        )

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }
        res.json(updatedPost)

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось добавить комментарий'
        })
    }
}
export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id

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
                postId: findPost._id,
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
            user: req.userId,
            tags: req.body.tags?.split(',')
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
export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        res.json(tags)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}