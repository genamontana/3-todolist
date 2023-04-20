import {action} from '@storybook/addon-actions';
import React from 'react';
import EditableSpan from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    argTypes: {
        onClick: {
            description:'Button inside form clicked'
        }
    }
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan value={'Start value'} onChange={changeCallback}/>
}