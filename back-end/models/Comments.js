import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    userId: {
        type: String,
        default: '',
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model('Comments', CommentsSchema)