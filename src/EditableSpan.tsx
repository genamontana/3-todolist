import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
}


const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(true)

    const activateEditMode = () => {

    }

    return editMode
        ? <input value={props.title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
};

export default EditableSpan;