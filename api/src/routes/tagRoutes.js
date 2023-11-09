const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tagRoutes = express.Router();

// Create
tagRoutes.post('/tags', async (request, response) => {
  const { name, color, todoId } = request.body;

  const tag = await prisma.tag.create({
    data: {
      name,
      color,
      todos: {
        connect: [{ id: todoId }]
      }
    }
  });

  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId
    },
    data: {
      tagId: {
        connect: {
          id: tag.id
        }
      }
    }
  });

  response.status(201).json({ tag, updatedTodo });
});

// Read

// Update

// Delete

module.exports = tagRoutes;
