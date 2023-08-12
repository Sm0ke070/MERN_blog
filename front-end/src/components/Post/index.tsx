import React, {FC} from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {UserInfo} from '../UserInfo';
import {PostSkeleton} from './Skeleton';
import {Link} from "react-router-dom";
import styles from './Post.module.scss';
import {useAppDispatch} from "../../redux/store";
import {deletePosts} from "../../redux/slices/posts/posts";
import ReactMarkdown from "react-markdown";

type PostPropsType = {
    id: string
    title: string
    createdAt: string
    imageUrl: string
    user: {
        _id: string
        fullName: string
        email: string
    }
    viewsCount: number
    commentsCount: number
    tags: string[]
    children: string //FIX
    isFullPost?: boolean //FIX
    isLoading?: boolean //FIX
    isEditable?: boolean //FIX
}
export const Post: FC<PostPropsType> = ({
                                            id,
                                            title,
                                            createdAt,
                                            imageUrl,
                                            user,
                                            viewsCount,
                                            commentsCount,
                                            tags,
                                            children,
                                            isFullPost,
                                            isLoading,
                                            isEditable,
                                        }) => {

    const dispatch = useAppDispatch()

    if (isLoading) {
        return <PostSkeleton/>;
    }

    const onClickRemove = () => {
        dispatch(deletePosts(id))
    };

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`posts/${id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
                    src={imageUrl}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo user={user} additionalText={createdAt}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        {isFullPost ? title : <Link to={`posts/${id}`}>{title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {tags && tags.map((name) => (
                            <li key={name}>
                                <Link to={`/tag/${name}`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {/*{children && <div className={styles.content}>{children}</div>}*/}
                    {children && <div className={styles.content}><ReactMarkdown children={children}/></div>}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon/>
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon/>
                            <span>{commentsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
