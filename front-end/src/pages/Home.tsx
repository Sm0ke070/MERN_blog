import React, {FC, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {Post, TagsBlock, CommentsBlock} from '../components';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchPosts, fetchTags} from "../redux/slices/posts/posts";
import {PostSkeleton} from "../components/Post/Skeleton";

export const Home: FC = () => {

    const dispatch = useAppDispatch()
    const {posts, tags} = useAppSelector(state => state.posts)
    const userData = useAppSelector(state => state.auth.data)
    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])


    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {isPostsLoading
                        ?
                        [...new Array(4)].map(() => <PostSkeleton/>)
                        :
                        posts.items.map(obj => <Post
                                key={obj._id}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                tags={obj.tags}
                                id={obj._id}
                                viewsCount={obj.viewsCount}
                                children={obj.text}
                                title={obj.title}
                                imageUrl={obj.imageUrl}
                                isEditable={userData?._id === obj.user._id}
                            />
                        )
                    }

                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={isTagsLoading}/>
                    <CommentsBlock
                        children={''}
                        items={[
                            {
                                user: {
                                    fullName: 'Никита Пулькин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
