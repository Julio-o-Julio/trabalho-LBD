import { useState } from 'react';

const Tags = ({ tags, deleteTag, modifyColorTag, setSelectedTag }) => {
  const [index, setIndex] = useState(0);
  const [colorTag, setColorTag] = useState(['red', 'blue', 'green', 'yellow']);

  const selectedColor = (color) => {

    

    if (index > 2) setIndex(0);
    else setIndex(index + 1);

    modifyColorTag(colorTag[index]);

    console.log(index);
  };

  return (
    <section className="tags">
      {tags &&
        tags.map((tag) => {
          return (
            <div key={tag.id} className="tag">
              <button
                style={{ backgroundColor: tag.color }}
                className={`checkbox`}
                title="Trocar cor"
                onClick={() => selectedColor(tag.color)}
              ></button>

              <article className="todoTextBox">
                <p className="todoName">{tag.name}</p>
                {tag.color && <p className="todoDescription">{tag.color}</p>}
              </article>

              <button
                className="buttonsTodo"
                title="Editar tarefa"
                onClick={() => setSelectedTag(tag)}
              >
                <img src="/edit-svg.svg" alt="Editar tarefa" />
              </button>
              <button
                className="buttonsTodo"
                title="Apagar tarefa"
                onClick={() => deleteTag(tag.id)}
              >
                <img src="/delete-svg.svg" alt="Apagar tarefa" />
              </button>
            </div>
          );
        })}
    </section>
  );
};

export default Tags;
