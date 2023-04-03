import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm called')
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label="Title"
                       helperText={error}/>

            <IconButton onClick={addItem}
                        color="primary">
                <AddBox/>
            </IconButton>
        </div>
    )
        ;
});
