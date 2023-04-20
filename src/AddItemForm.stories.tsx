import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import Button from '@mui/material/Button';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {};





const TemplateError: ComponentStory<typeof AddItemForm> = (args) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>('Title is required')

    const addItem = () => {
        if (title.trim() !== '') {
            args.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField value={title}
                   onChange={onChange}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label="Title"
                   helperText={error}/>

        <IconButton onClick={addItem}
                    color="primary">
            <AddBox/>
        </IconButton>
    </div>
};

export const AddItemFormWithErrorStory = TemplateError.bind({});
AddItemFormWithErrorStory.args = {};



/*
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';
import React from 'react';

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action('Button add was pressed inside the form')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}
*/

