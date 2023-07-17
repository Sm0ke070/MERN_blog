import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {Post, TagsBlock, CommentsBlock} from '../components';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchPosts, fetchTags} from "../redux/slices/posts/posts";
import Skeleton from "@mui/material/Skeleton";

export const Home = () => {

    const dispatch = useAppDispatch()
    const {posts, tags} = useAppSelector(state => state.posts)
    const isPostsLoading = posts.status === 'loading'
    const isTagsLoading = tags.status === 'loading'

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])

    // const skeletons = [...new Array(5)].map((_, i) => <Post
    //     key={i}
    //     id={'1'}
    //
    //     imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
    //     user={{
    //         avatarUrl:
    //             'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
    //         fullName: 'Keff',
    //     }}
    //     viewsCount={150}
    //     commentsCount={3}
    //     tags={['react', 'fun', 'typescript']}
    //     isEditable
    // />)

    const post = posts.items.map(obj => <Post
            key={obj._id}
            user={obj.user}
            createdAt={obj.createdAt}
            tags={obj.tags}
            id={obj._id}
            viewsCount={obj.viewsCount}
            children={obj.text}
            title={obj.title}
            imageUrl={obj.imageUrl}
            isEditable
        />
    )

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
                        <Skeleton sx={{bgcolor: 'grey.300'}} variant="rounded" width={730} height={360}/>
                        :
                        post
                    }

                    {/*{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, idx) =>*/}
                    {/*    isPostsLoading ? (*/}
                    {/*        <Post/>*/}
                    {/*    ) : (*/}
                    {/*        <Post*/}
                    {/*            key={obj._id}*/}
                    {/*            id={obj._id}*/}
                    {/*            title={obj.title}*/}
                    {/*            imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"*/}
                    {/*            user={{*/}
                    {/*                avatarUrl:*/}
                    {/*                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',*/}
                    {/*                fullName: 'Keff',*/}
                    {/*            }}*/}
                    {/*            createdAt={'12 июня 2022 г.'}*/}
                    {/*            viewsCount={150}*/}
                    {/*            commentsCount={3}*/}
                    {/*            tags={['react', 'fun', 'typescript']}*/}
                    {/*            isEditable*/}
                    {/*        />*/}

                    {/*    )*/}
                    {/*)}*/}

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
