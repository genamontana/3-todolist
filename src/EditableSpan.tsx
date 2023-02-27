import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}


const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title}
                 onBlur={activateViewMode}
                 onChange={onChangeHandler}
                 autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};

export default EditableSpan;