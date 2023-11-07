const Todos = ({ todos, deleteTodo }) => {
  return (
    <section className="todos">
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="todo">
            <button
              className={`checkbox ${todo.status ? 'active' : ''}`}
            ></button>
            <p>{todo.name}</p>
            {todo.description && <p>{todo.description}</p>}
            <button className="buttonsTodo">
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
