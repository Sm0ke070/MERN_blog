import axios from "../axios";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {fetchCurrentPosts, IFetchPosts} from "../redux/slices/posts/posts";
import {Post, Index, CommentsBlock} from "../components";
import {PostSkeleton} from "../components/Post/Skeleton";
import {useAppDispatch, useAppSelector} from "../redux/store";

export const FullPost = () => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IFetchPosts | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const {id} = useParams()

    useEffect(() => {
        if (!id) return
        dispatch(fetchCurrentPosts(id))
            .then((res) => {
                console.log(res.payload, 'RES')
                setData(res.payload)
                setIsLoading(false)
            }).catch((err) => {
            console.log(err)
            alert('Ошибка при получении статьи')
        })
    }, [id])

    if (isLoading) {
        return <PostSkeleton/>
    }


    return (
        <>
            {data && <Post
                createdAt={data.createdAt}
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
                user={data.user}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost
            >
                <p>{data.text}</p>
                {/*<ReactMarkdown children={data.text}/>*/}
            </Post>}

            <CommentsBlock
                // @ts-ignore //FIX
                items={data?.comments}
                isLoading={isLoading}
            >
                {isAuth && <Index postId={id}/>}
            </CommentsBlock>
        </>
    );
};
