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
      color
    }
  });

  

  response.status(201).json(tag);
});

// Read

// Update

// Delete

module.exports = tagRoutes;
