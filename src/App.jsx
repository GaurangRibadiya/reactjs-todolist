import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
    const [todos, setTodos] = useState([
        'Go to the gym',
        'Change details in Immigration website',
        'Eat more fruits and vegetables'
    ])
    const [todoValue, setTodoValue] = useState('')

    useEffect(() => {
        // Load todos from local storage on component mount
        const savedTodos = JSON.parse(localStorage.getItem('todos'))
        if (savedTodos) {
            setTodos(savedTodos)
        }
    }, []);

    function handleAddTodos(newTodo) {
        const newTodoList = [...todos, newTodo]
        setTodos(newTodoList)
        localStorage.setItem('todos', JSON.stringify(newTodoList))
    }

    function handleDeleteTodo(index) {
        const newTodoList = todos.filter((todo, todoIndex) => {
            return todoIndex !== index
        })
        setTodos(newTodoList)
        localStorage.setItem('todos', JSON.stringify(newTodoList))
    }

    function handleEditTodo(index) {
        const valueToBeEdited = todos[index]
        setTodoValue(valueToBeEdited)
        handleDeleteTodo(index)
    }

    return (
        <>
            <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
            <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
        </>
    )
}

export default App
