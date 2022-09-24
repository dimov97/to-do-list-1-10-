import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddNewItemType = {
    addItem: (newTitle: string) => void
}

export const AddNewItem:React.FC<AddNewItemType> = ({addItem}) => {
    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required !')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error?'error':''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error&&<div className='errorMessage'>{error}</div>}
        </div>
    );
};

