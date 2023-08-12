import React, {FC, useState} from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import axios from "../../axios";
import {IFetchPosts} from "../../redux/slices/posts/posts";

type AddCommentPropsType = {
    postId?: string
    setData: (data: IFetchPosts) => void
}
export const AddComment: FC<AddCommentPropsType> = ({postId, setData}) => {

    const dispatch = useAppDispatch()
    const [commentText, setCommentText] = useState('')
    const userData = useAppSelector(state => state.auth.data)

    const changeCommentText = (value: string) => {
        setCommentText(value)

    }
    const addComment = async () => {
        await axios.patch(`/posts/${postId}/comments`, {
            userName: userData?.fullName,
            text: commentText,
            avatarUrl: userData?.avatarUrl
        })
            .then(() => {
                setCommentText('')
            })
        await axios.get(`/posts/${postId}`)
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err)
                alert('Ошибка при получении статьи')
            })
    }
    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src={userData?.avatarUrl}
                />
                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        value={commentText}
                        onChange={(e) => changeCommentText(e.currentTarget.value)}
                        multiline
                        fullWidth
                    />
                    <Button onClick={addComment} variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};
