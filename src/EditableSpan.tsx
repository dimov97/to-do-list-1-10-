import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title:string
    onChange:(newTitle:string)=>void
}

export const EditableSpan:React.FC<EditableSpanType> = ({title,onChange}) => {
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState('')

    const activateEditMode =()=> {
        setEditMode(true)
        setNewTitle(title)
    }
    const activateViewMode =()=> {
        setEditMode(false)
        onChange(newTitle)
    }
    return editMode
        ? <input value={newTitle} onBlur={activateViewMode} autoFocus onChange={(e: ChangeEvent<HTMLInputElement>)=>{setNewTitle(e.currentTarget.value)}}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
};

