import { useEffect, useState } from 'react';
import axios from 'axios';
import Todos from './components/Todos';
import './styles/App.css';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const createTodo = async () => {
    const response = await axios.post('http://localhost:8080/todos', {
      name,
      description
    });

    getTodos();
    setName('');
    setDescription('');
  };

  const getTodos = async () => {
    const response = await axios.get('http://localhost:8080/todos');

    setTodos(response.data);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:8080/todos/${id}`);

    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    createTodo(name, description);
  };

  return (
    <main>
      <header className="header">
        <h2>Minha lista de tarefas</h2>
      </header>
      <Todos todos={todos} deleteTodo={deleteTodo} />
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          value={name}
          placeholder="Nome da tarefa*"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          className="input"
          name="description"
          type="text"
          value={description}
          placeholder="Descrição da tarefa"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <button className="newTaskButton">Adicionar tarefa</button>
      </form>
    </main>
  );
}

export default App;
