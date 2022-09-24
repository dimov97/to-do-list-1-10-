import { tasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";



type RemoveTaskActionType = {
    type:'REMOVE-TASK'
    taskId:string
    todolistId:string
}
type AddTaskActionType = {
    type:'ADD-TASK'
    title:string
    todolistId:string
}
type ChangeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS'
    id:string
    isDone:boolean
    todolistId:string
}
type ChangeTaskTitleActionType = {
    type:'CHANGE-TASK-TITLE'
    id:string
    title:string
    todolistId:string
}
type ActionsType = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType|ChangeTaskTitleActionType|AddTodolistActionType|RemoveTodolistActionType

const initialState = {
    [todolistId1]: [
        {id: v1(), title: 'html', isDone: true},
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: 'book', isDone: true},
        {id: v1(), title: 'milk', isDone: false}
    ]
}


export const tasksReducer = (state:tasksStateType = initialState,action:ActionsType): tasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t=>t.id!==action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask,...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let change = tasks.find(t => t.id === action.id)
            if (change) {
                change.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let change = tasks.find(t => t.id === action.id)
            if (change) {
                change.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[action.todolistId]=[]
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId:string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId:taskId, todolistId:todolistId}
}
export const addTaskAC = (title: string, todolistId:string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId:todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId:string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id:id,isDone:isDone, todolistId:todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId:string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id:id,title:title, todolistId:todolistId}
}

