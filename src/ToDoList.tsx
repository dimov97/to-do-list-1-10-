import React, {ChangeEvent} from 'react';
import {filterType, tasksType} from "./App";
import {AddNewItem} from "./AddNewItem";
import {EditableSpan} from "./EditableSpan";

type ToDoListType = {
    title: string
    id:string
    tasks: tasksType[]
    removeTask: (id: string, todolistId:string) => void
    filterTask: (value: filterType, todolistId:string) => void
    addTask: (newTitle: string, todolistId:string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId:string) => void
    changeTaskTitle: (id: string, newTitle:string, todolistId:string) => void
    filter:filterType
    removeTodolist:(id:string)=>void
    changeTodolistTitle:(newTitle:string, id:string)=>void
}

export const ToDoList: React.FC<ToDoListType> = ({title, tasks, removeTask, filterTask, addTask, changeTaskStatus,filter,id,removeTodolist,changeTaskTitle,changeTodolistTitle}) => {

    const onClickAllHandler = () => {
        filterTask('all',id)
    }
    const onClickActiveHandler = () => {
        filterTask('active',id)
    }
    const onClickCompletedHandler = () => {
        filterTask('completed',id)
    }
    const addTasks = (newTitle:string) => {
        addTask(newTitle, id)
    }
    const removeTodolistHandler = ()=>{
        removeTodolist(id)
    }
    const changeTodolistTitleHandler = (newTitle:string) => {
        changeTodolistTitle(newTitle, id)
    }


    return (
        <div>
            <h3><button onClick={removeTodolistHandler}>x</button> <EditableSpan title={title} onChange={changeTodolistTitleHandler}/></h3>
            <AddNewItem addItem={addTasks}/>
            <ul>
                {tasks.map((t) => {
                    const removeTaskHandler = () => {
                        removeTask(t.id,id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newTaskStatus = e.currentTarget.checked
                        changeTaskStatus(t.id, newTaskStatus,id)
                    }
                    const changeTaskTitleHandler = (newTitle:string) => {
                        changeTaskTitle(t.id, newTitle,id)
                    }
                    return (
                        <li key={t.id} className={t.isDone?'isDone':''}>
                            <button onClick={removeTaskHandler}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeTaskStatusHandler}
                            />
                            <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter==='all'?'filterActive':''} onClick={onClickAllHandler}>All</button>
                <button className={filter==='active'?'filterActive':''} onClick={onClickActiveHandler}>Active</button>
                <button className={filter==='completed'?'filterActive':''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

