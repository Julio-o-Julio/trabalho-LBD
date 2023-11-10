const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tagRoutes = express.Router();

// Create
tagRoutes.post('/tags', async (request, response) => {
  const { name, color, todoId } = request.body;

  if (!todoId) return response.status(400).json('todoId is required');

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: todoId }
  });

  if (!todoAlreadyExist) return response.status(404).json('Todo not found');

  const tag = await prisma.tag.create({
    data: {
      name,
      color
    }
  });

  const tagTodo = await prisma.tagTodo.create({
    data: {
      todo: { connect: { id: todoId } },
      tag: { connect: { id: tag.id } }
    }
  });

  response.status(201).json({ tag, tagTodo });
});

// Read
tagRoutes.get('/tags', async (request, response) => {
  const tags = await prisma.tag.findMany();

  return response.status(200).json(tags);
});

// Update
tagRoutes.put('/tags', async (request, response) => {
  let newTagTodo = null;

  const { id, name, color, todoId } = request.body;

  if (!id || !todoId)
    return response.status(400).json('Both id and todoId are required');

  const tag = await prisma.tag.findUnique({ where: { id } });

  if (!tag) return response.status(404).json('Tag not found');

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
    // Se nao houver uma relação TagTodo para essa Tag e Todo, criamos uma nova
    newTagTodo = await prisma.tagTodo.create({
      data: {
        todo: { connect: { id: todoId } },
        tag: { connect: { id } }
      }
    });
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

module.exports = tagRoutes;
