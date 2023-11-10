import { useEffect, useState } from 'react';
import Tags from './Tags';
import axios from 'axios';

const ModalAddTag = ({ todo, setModalAddTag }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(null);

  const setSelectedTag = (selectedTag) => {
    if (todo === selectedTag) {
      setTag(null);
      setName('');
      setColor(null);
    } else {
      setTag(selectedTag);
      setName(selectedTag.name);
      setColor(selectedTag.color);
    }
  };

  const createTag = async () => {
    const response = await axios.post('http://localhost:8080/tags', {
      name,
      color,
      todoId: todo.id
    });

    getTags();
    setName('');
    setColor(null);
  };

  const getTags = async () => {
    const response = await axios.get('http://localhost:8080/tags');

    setTags(response.data);
  };

  const deleteTag = async (id) => {
    const response = await axios.delete(`http://localhost:8080/tags/${id}`);

    getTags();
  };

  const modifyColorTag = async (color) => {
    if (tag) {
      const response = await axios.put(`http://localhost:8080/tags`, {
        id: tag.id,
        name,
        color,
      });
  
      getTags();
    }
  };  

  const editTag = async () => {
    const response = await axios.put('http://localhost:8080/tags', {
      id: tag.id,
      name,
      color
    });

    setTag(null);
    setName('');
    setColor(null);
    getTags();
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) setModalAddTag(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (tag) editTag();
    else createTag();
  };

  return (
    <section className="modalContainer" onClick={handleOutsideClick}>
      <article className="modalContent">
        <h3>Adicionar Tags</h3>

        <Tags
          tags={tags}
          deleteTag={deleteTag}
          modifyColorTag={modifyColorTag}
          setSelectedTag={setSelectedTag}
        />

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            name="name"
            type="text"
            value={name}
            placeholder={tag ? 'Alterar nome' : 'Nome da tag*'}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className="input"
            name="color"
            type="text"
            value={color ? color : ''}
            placeholder={tag ? 'Adicionar cor a tag' : 'Cor da tag'}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />

          <button className="newTaskButton">
            {todo ? 'Alterar tag' : 'Adicionar tag'}
          </button>
        </form>
      </article>
    </section>
  );
};

export default ModalAddTag;
