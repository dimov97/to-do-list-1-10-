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

function AppWithReducers() {

    function filterTask(value: filterType, todolistId: string) {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatchToTodolistsReducer(action)
    }

    function addTask(newTitle: string, todolistId: string) {
        const action = addTaskAC(newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)

    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'what to learn ?', filter: 'all'},
        {id: todolistId2, title: 'what to buy ?', filter: 'all'}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'milk', isDone: false}
        ]
    })

    function addTodolist(newTitle: string) {
        const action = AddTodolistAC(newTitle)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    function changeTodolistTitle(newTitle: string, id: string) {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
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

export default AppWithReducers;
