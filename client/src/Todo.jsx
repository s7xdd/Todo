
export default function Todo(props) {
    const { todo, setTodos } = props
    
    const updateTodo = async (todoId, todoStatus) => {
      const res = await fetch(`api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status: todoStatus }),
        headers: {
          "Content-Type": "application/JSON"
        },
      })

      const json = await res.json()
      if(json){
        setTodos(currentTodos => {
          return currentTodos.map((currentTodo) => {
            if(currentTodo._id === todoId) {
              return { ...currentTodo, status: !currentTodo.status }
            }
            return currentTodo
          })
        })
      }
    }

    const deleteTodo = async (todoId) => {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE"
      })

      const json = await res.json()
      if (json){
        setTodos(currentTodos => {
          return currentTodos.filter((currentTodo) => (currentTodo._id !== todoId))
        })
      }

    }

    return(
        <div className='todo'>
            <p>{todo.title}</p>
            <div className='mutations'>
              <button 
                className='todo__status'
                onClick={() => updateTodo(todo._id, todo.status)}
                >
                {(todo.status) ? "☑" : "☐"}
              </button>
              <button
              className='todo__delete'
              onClick={() => deleteTodo(todo._id)}
              >
              🗑️
              </button>
            </div>
          </div>
    )
}