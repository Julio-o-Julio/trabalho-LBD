const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tagRoutes = express.Router();

// Create
tagRoutes.post('/tags', async (request, response) => {
  const { name, color, todoId } = request.body;

  if (todoId) {
    const todoAlreadyExist = await prisma.todo.findUnique({
      where: { id: todoId }
    });

    if (!todoAlreadyExist) return response.status(404).json('Todo not found');
  }

  const tag = await prisma.tag.create({
    data: {
      name,
      color
    }
  });

  if (todoId) {
    const tagTodo = await prisma.tagTodo.create({
      data: {
        todo: { connect: { id: todoId } },
        tag: { connect: { id: tag.id } }
      }
    });

    response.status(201).json({ tag, tagTodo });
  } else {
    response.status(201).json({ tag });
  }
});

// Read
tagRoutes.get('/tags', async (request, response) => {
  const { todoId } = request.query;

  if (todoId) {
    // Se todoId for fornecido, retornar apenas as tags relacionadas à Todo específica
    const tags = await prisma.tag.findMany({
      where: {
        tagTodo: {
          some: {
            todoId: parseInt(todoId)
          }
        }
      }
    });

    return response.status(200).json(tags);
  } else {
    // Caso contrário, retornar todas as tags
    const tags = await prisma.tag.findMany();
    return response.status(200).json(tags);
  }
});

// Read 2
tagRoutes.get('/tags/:todoId', async (request, response) => {
  const { todoId } = request.params;

  if (!todoId) return response.status(400).json('todoId is required');

  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(todoId) }
  });

  if (!todo) return response.status(404).json('Todo not found');

  const tags = await prisma.tag.findMany({
    where: {
      tagTodo: {
        some: {
          todoId: parseInt(todoId)
        }
      }
    }
  });

  return response.status(200).json(tags);
});

// Update
tagRoutes.put('/tags', async (request, response) => {
  let newTagTodo = null;

  const { id, name, color, todoId } = request.body;

  if (!id) return response.status(400).json('Id is required');

  const tag = await prisma.tag.findUnique({ where: { id } });

  if (!tag) return response.status(404).json('Tag not found');

  if (todoId) {
    const todoAlreadyExist = await prisma.todo.findUnique({
      where: { id: todoId }
    });

    if (!todoAlreadyExist) return response.status(404).json('Todo not exists');

    const tagTodo = await prisma.tagTodo.findFirst({
      where: {
        todoId,
        tagId: tag.id
      }
    });

    if (!tagTodo) {
      newTagTodo = await prisma.tagTodo.create({
        data: {
          todo: { connect: { id: todoId } },
          tag: { connect: { id } }
        }
      });
    }
  }

  const updatedTag = await prisma.tag.update({
    where: { id },
    data: {
      name,
      color: color || tag.color
    }
  });

  if (newTagTodo) return response.status(200).json({ updatedTag, newTagTodo });

  return response.status(200).json(updatedTag);
});

// Delete
tagRoutes.delete('/tags/:id', async (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);

  if (!intId) return response.status(400).json({ error: 'Id is required' });

  const tag = await prisma.tag.findUnique({
    where: { id: intId }
  });

  if (!tag) return response.status(404).json({ error: 'Tag not exists' });

  await prisma.tagTodo.deleteMany({
    where: { tagId: intId }
  });

  await prisma.tag.delete({ where: { id: intId } });

  return response.status(200).json({ success: 'Tag deleted' });
});

// Create TagTodo
tagRoutes.post('/tag-todos', async (request, response) => {
  const { tagId, todoId } = request.body;

  if (!tagId || !todoId)
    return response.status(400).json('Both tagId and todoId are required');

  const tag = await prisma.tag.findUnique({ where: { id: tagId } });

  if (!tag) return response.status(404).json('Tag not found');

  const todo = await prisma.todo.findUnique({ where: { id: todoId } });

  if (!todo) return response.status(404).json('Todo not found');

  // Verifica se a relação TagTodo já existe
  const existingTagTodo = await prisma.tagTodo.findFirst({
    where: {
      tagId: tag.id,
      todoId: todo.id
    }
  });

  if (existingTagTodo) {
    // Se a relação já existe, você pode optar por retornar um erro ou simplesmente informar que já existe.
    return response.status(409).json('TagTodo relation already exists');
  }

  // Se a relação não existe, cria ela
  const tagTodo = await prisma.tagTodo.create({
    data: {
      todo: { connect: { id: todoId } },
      tag: { connect: { id: tagId } }
    }
  });

  response.status(201).json(tagTodo);
});

// Delete TagTodo
tagRoutes.delete('/tag-todos/:tagId/:todoId', async (request, response) => {
  const { tagId, todoId } = request.params;

  if (!tagId || !todoId)
    return response.status(400).json('Both tagId and todoId are required');

  const tag = await prisma.tag.findUnique({ where: { id: parseInt(tagId) } });

  if (!tag) return response.status(404).json('Tag not found');

  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(todoId) }
  });

  if (!todo) return response.status(404).json('Todo not found');

  // Busca e deleta a TagTodo se existir
  const existingTagTodo = await prisma.tagTodo.findFirst({
    where: {
      tagId: tag.id,
      todoId: todo.id
    }
  });

  if (existingTagTodo) {
    await prisma.tagTodo.delete({
      where: {
        id: existingTagTodo.id
      }
    });

    return response.status(200).json('TagTodo relation deleted');
  }

  // Se a relação não existe, retorna um erro
  return response.status(404).json('TagTodo relation not found');
});

module.exports = tagRoutes;
