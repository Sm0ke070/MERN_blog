import React, {FC, useState} from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../redux/store";
import axios from "../../axios";

type AddCommentPropsType = {
    postId?: string
}
export const Index: FC<AddCommentPropsType> = ({postId}) => {
    const [commentText, setCommentText] = useState('')
    const data = useAppSelector(state => state.auth.data)

    const changeCommentText = (value: string) => {
        setCommentText(value)

    }
    const addComment = async () => {
        await axios.patch(`/posts/comments/${postId}`, {
            userName: data?.fullName,
            text: commentText,
            avatarUrl: data?.avatarUrl
        })
            .then(() => {
                setCommentText('')
            })
        await axios.get(`/posts/${postId}`).then((res) => {

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
                    src={data?.avatarUrl}
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
