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
todoRoutes.get('/todos', (request, response) => {
  return response.status(200).json(todos);
});

// Update
// Delete

module.exports = todoRoutes;
