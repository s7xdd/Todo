import './style.css'
import { useEffect, useState } from 'react'
import Todo from './Todo'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      const res = await fetch('http://localhost:5000/api/todos')
      const todos = await res.json()

      setTodos(todos)
    }
    getTodos()
  }, [])

  const [content,setContent] = useState("")

  const createNewTodo = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      body: JSON.stringify({ 
        title: content
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const newTodo = await res.json()

    setContent("")
    setTodos([...todos,newTodo])
  }

  

  return (
    <main className='container'>
      <h1 className='title'>To Do List</h1>

      <form className='form' onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new Todo"
          className='form__input'
          required
        />
        <button type="submit">Create Todo</button>
      </form>

      <div className='todos'>
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} setTodos={setTodos} />
        ))}
      </div>
    </main>
  )
}

export default App
