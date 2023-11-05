const express = require('express');

const todos = [{ name: 'Julio', status: false }];

const todoRoutes = express.Router();

// Create
todoRoutes.post('/todos', (request, response) => {
  const { name } = request.body;
  todos.push({ name, status: false });

  return response.status(201).json(todos);
});

// Read
// Update
// Delete

module.exports = todoRoutes;
