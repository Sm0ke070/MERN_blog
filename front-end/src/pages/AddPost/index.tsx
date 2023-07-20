import React, {ChangeEvent, useRef, useState} from 'react';
import 'easymde/dist/easymde.min.css';
import {Navigate} from "react-router";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './AddPost.module.scss';
import SimpleMDE from "react-simplemde-editor";
import TextField from '@mui/material/TextField';
import {useAppSelector} from "../../redux/store";

export const AddPost = () => {

    const imageUrl = ''
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData()
            const file = event.target.files
            if (file) return formData.append('image', file[0])

        } catch (err) {

        }
    }

    const onClickRemoveImage = () => {
    }

    const onChange = React.useCallback((value: string) => {
        setValue(value);
    }, [])

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
                <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Удалить
                </Button>
            )}
            {imageUrl && (
                <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
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
            <TextField classes={{root: styles.tags}} variant="standard" placeholder="Тэги" fullWidth/>
            <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options as any}/> //FIX
            <div className={styles.buttons}>
                <Button size="large" variant="contained">
                    Опубликовать
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};
