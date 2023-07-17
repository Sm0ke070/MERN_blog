import React, {useEffect, useState} from "react";

import {Post, Index, CommentsBlock} from "../components";
import {useParams} from "react-router";
import axios from "../axios";
import {IFetchPosts} from "../redux/slices/posts/posts";

export const FullPost = () => {
    const [data, setData] = useState<IFetchPosts | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        axios.get(`/posts/${id}`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            alert('Ошибка при получении статьи')
        })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading}/>
    }

    return (
        <>
            <Post
                id={data?._id}
                title={data?.title}
                imageUrl={data?.imageUrl}
                user={data?.user}
                viewsCount={data?.viewsCount}
                commentsCount={3}
                tags={data?.tags}
                isFullPost
            >
                <p>
                    {data?.text}
                </p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <Index/>
            </CommentsBlock>
        </>
    );
};
