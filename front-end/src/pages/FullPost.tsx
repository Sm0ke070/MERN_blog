import axios from "../axios";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {IFetchPosts} from "../redux/slices/posts/posts";
import {Post, AddComment, CommentsBlock} from "../components";
import {PostSkeleton} from "../components/Post/Skeleton";
import {useAppDispatch, useAppSelector} from "../redux/store";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IFetchPosts | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const {id} = useParams()

    console.log('FullPost RENDER')

    useEffect(() => {
        if (id) {
            //dispatch(fetchCurrentPosts(id))
            axios.get(`/posts/${id}`)
                .then((res) => {
                    console.log(res.data, 'RES')
                    setData(res.data)
                    setIsLoading(false)
                }).catch((err) => {
                console.log(err)
                alert('Ошибка при получении статьи')
            })
        }
    }, [id, dispatch])

    if (isLoading) {
        return <PostSkeleton/>
    }

    return (
        <>
            {data && <>
                <Post
                    createdAt={data.createdAt}
                    id={data._id}
                    title={data.title}
                    imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''} //FIX
                    user={data.user}
                    viewsCount={data.viewsCount}
                    commentsCount={data.comments.length}
                    tags={data.tags}
                    isFullPost
                >
                    {data.text}
                    {/*<ReactMarkdown children={data.text}/>*/}
                </Post>

                <CommentsBlock
                    items={data.comments}
                    isLoading={isLoading}
                >
                    {isAuth && <AddComment setData={setData} postId={id}/>}
                </CommentsBlock>
            </>
            }

        </>
    );
};
