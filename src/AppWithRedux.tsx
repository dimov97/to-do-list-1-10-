import React, {useReducer, useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddNewItem} from "./AddNewItem";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'active' | 'completed'
export type todolistsType = {
    id: string
    title: string
    filter: filterType
}
export type tasksStateType = {
    [key: string]: tasksType[]
}

function AppWithRedux() {

    function filterTask(value: filterType, todolistId: string) {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }

    function addTask(newTitle: string, todolistId: string) {
        const action = addTaskAC(newTitle, todolistId)
        dispatch(action)
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)

    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    }

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState,todolistsType[]>(state=>state.todolists)
    const tasks = useSelector<AppRootState,tasksStateType>(state=>state.tasks)


    function addTodolist(newTitle: string) {
        const action = AddTodolistAC(newTitle)
        dispatch(action)
    }

    function changeTodolistTitle(newTitle: string, id: string) {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }

    return (
        <div className="App">
        <AddNewItem addItem={addTodolist}/>
    {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id]
        if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }
        return (
            <ToDoList title={tl.title}
        id={tl.id}
        key={tl.id}
        tasks={filteredTasks}
        removeTask={removeTask}
        filterTask={filterTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={tl.filter}
        removeTodolist={removeTodolist}
        changeTaskTitle={changeTaskTitle}
        changeTodolistTitle={changeTodolistTitle}
        />
    )
    })}
    </div>
);
}

export default AppWithRedux;
