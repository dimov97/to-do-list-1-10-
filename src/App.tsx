import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddNewItem} from "./AddNewItem";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all' | 'active' | 'completed'
export type todolistsType = {
    id:string
    title:string
    filter:filterType
}
export type tasksStateType = {
    [key:string]:tasksType[]
}

function App() {

    function filterTask(value: filterType, todolistId:string) {
        let todolistTask = todolists.find(tl=>tl.id===todolistId)
        if (todolistTask) {
            todolistTask.filter=value
            setTodolists([...todolists])
        }
    }

    function addTask(newTitle: string, todolistId:string) {
        let task = {id: v1(), title: newTitle, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task,...todolistTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId:string) {
        let todolistTasks = tasks[todolistId]
        let change = todolistTasks.find(t => t.id === id)
        if (change) {
            change.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle:string, todolistId:string) {
        let todolistTasks = tasks[todolistId]
        let change = todolistTasks.find(t => t.id === id)
        if (change) {
            change.title = newTitle
            setTasks({...tasks})
        }
    }

    function removeTask(id: string, todolistId:string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function removeTodolist(id:string) {
        setTodolists(todolists.filter(tl=>tl.id!==id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists,setTodolists] = useState<todolistsType[]>([
        {id:todolistId1,title:'what to learn ?',filter:'all'},
        {id:todolistId2,title:'what to buy ?',filter:'all'}
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]:[
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false}
        ],
        [todolistId2]:[
            {id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'milk', isDone: false}
        ]
    })
    function addTodolist(newTitle:string) {
        let todolist:todolistsType = {id:v1(),title:newTitle,filter:'all'}
        setTodolists([todolist,...todolists])
        setTasks({...tasks, [todolist.id]:[] })
    }
    function changeTodolistTitle(newTitle:string, id:string) {
        let changeTitle = todolists.find(tl=>tl.id===id)
        if (changeTitle) {
            changeTitle.title=newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddNewItem addItem={addTodolist}/>
            {todolists.map((tl)=>{
                let filteredTasks = tasks[tl.id]
                if (tl.filter === "active") {
                    filteredTasks = filteredTasks.filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    filteredTasks = filteredTasks.filter(t => t.isDone)
                }
                return(
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

export default App;
