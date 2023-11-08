const Todos = ({ todos, deleteTodo, modifyStatusTodo, setSelectedTodo }) => {
  return (
    <section className="todos">
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="todo">
            <button
              className={`checkbox ${todo.status ? 'active' : ''}`}
              onClick={() => modifyStatusTodo(todo)}
            ></button>
            <article className="todoTextBox">
              <p className="todoName">{todo.name}</p>
              {todo.description && (
                <p className="todoDescription">{todo.description}</p>
              )}
            </article>
            <button
              className="buttonsTodo"
              onClick={() => setSelectedTodo(todo)}
            >
              <img src="/edit-svg.svg" alt="Editar tarefa" />
            </button>
            <button className="buttonsTodo" onClick={() => deleteTodo(todo.id)}>
              <img src="/delete-svg.svg" alt="Editar tarefa" />
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default Todos;
