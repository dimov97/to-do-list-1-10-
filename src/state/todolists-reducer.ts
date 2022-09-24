import {filterType, todolistsType} from "../App";
import {v1} from "uuid";



export type RemoveTodolistActionType = {
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type:'ADD-TODOLIST'
    title:string
    todolistId:string
}
type ChangeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
type ChangeTodolistFilterActionType = {
    id:string
    type:'CHANGE-TODOLIST-FILTER'
    filter:filterType
}
type ActionsType = RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState:Array<todolistsType> = [
    {id:todolistId1,title:'what to learn ?',filter:'all'},
    {id:todolistId2,title:'what to buy ?',filter:'all'}
]

export const todolistsReducer = (state:Array<todolistsType> = initialState,action:ActionsType): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl=>tl.id!==action.id)
        }
        case 'ADD-TODOLIST' : {
            return [{id:action.todolistId,title:action.title,filter:'all'},...state]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            let changeTitle = state.find(tl=>tl.id===action.id)
            if (changeTitle) {
                changeTitle.title=action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let changeTitle = state.find(tl=>tl.id===action.id)
            if (changeTitle) {
                changeTitle.filter=action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId:v1()}
}
export const ChangeTodolistTitleAC = (id:string,title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE',id:id,title:title }
}
export const ChangeTodolistFilterAC = (id:string,filter: filterType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER',id:id,filter:filter }
}
