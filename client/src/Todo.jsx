
export default function Todo(props) {
    const { todo, setTodos } = props
    
    const updateTodo = async (todoId, todoStatus) => {
      const res = await fetch(`http://localhost:5000/api/todos/${todoId}`, {
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

    return(
        <div className='todo'>
            <p>{todo.title}</p>
            <div>
              <button 
                className='todo__status'
                onClick={() => updateTodo(todo._id, todo.status)}
                >
                {(todo.status) ? "☑" : "☐"}
              </button>
            </div>
          </div>
    )
}