const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const todoRoutes = express.Router();

// Create
todoRoutes.post('/todos', async (request, response) => {
  const { name, description } = request.body;
  const todo = await prisma.todo.create({
    data: {
      name,
      description
    }
  });

  return response.status(201).json(todo);
});

// Read
todoRoutes.get('/todos', async (request, response) => {
  const todos = await prisma.todo.findMany();
  return response.status(200).json(todos);
});

// Update
todoRoutes.put('/todos', async (request, response) => {
  const { id, name, status } = request.body;

  if (!id) return response.status(400).json('Id is required');

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExist) return response.status(404).json('Todo not exists');

  const alterTodo = await prisma.todo.update({
    where: { id },
    data: {
      name,
      status,
      description
    }
  });

  return response.status(200).json(alterTodo);
});

// Delete
todoRoutes.delete('/todos/:id', async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) return response.status(400).json('Id is required');

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intId }
  });

  if (!todoAlreadyExist) return response.status(404).json('Todo not exists');

  await prisma.todo.delete({ where: { id: intId } });

  return response.status(200).send();
});

module.exports = todoRoutes;
