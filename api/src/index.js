const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(todoRoutes);

app.get('/', (request, response) => {
  return response.json('up');
});

app.listen('8080', () => console.log('Server up in pot: 8080'));
