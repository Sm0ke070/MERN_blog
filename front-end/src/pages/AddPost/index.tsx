import React, {ChangeEvent, useRef, useState} from 'react';
import 'easymde/dist/easymde.min.css';
import {Navigate, useNavigate} from "react-router";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './AddPost.module.scss';
import SimpleMDE from "react-simplemde-editor";
import TextField from '@mui/material/TextField';
import {useAppSelector} from "../../redux/store";
import axios from "../../axios";

export const AddPost = () => {

    const navigate = useNavigate()
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const [imageUrl, setImageUrl] = useState('')
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData()
            const file = event.target.files

            if (file) {
                formData.append('image', file[0])
                const {data} = await axios.post('/upload', formData)
                setImageUrl(data.url)
            }
        } catch (err) {
            alert('Ошибка при загрузке файла!')
            console.warn(err)
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('')
    }

    const onChange = React.useCallback((value: string) => {
        setText(value);
    }, [])

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            const fields = {
                title: title?.trim(),
                imageUrl,
                tags: tags?.trim(),
                text
            }
            const {data} = await axios.post('/posts', fields)
            console.log(fields, 'tags')
            const id = data._id
            navigate(`/posts/${id}`)
        } catch (err) {
            alert('Ошибка при создании статьи!')
            console.warn(err)
        }
    }

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    )

    if (!isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current?.click()} variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <img className={styles.image} src={`http://localhost:4444/${imageUrl}`} alt="Uploaded"/>
                </>

            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Заголовок статьи..."
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                fullWidth
            />
            <TextField classes={{root: styles.tags}}
                       variant="standard"
                       onChange={(e) => setTags(e.target.value)}
                       placeholder="Тэги" fullWidth/>

            <SimpleMDE className={styles.editor}
                       value={text}
                       onChange={onChange}
                       options={options as any}/> {/* FIX */}

            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    Опубликовать
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};
