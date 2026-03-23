const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // разрешаем все CORS-запросы (для разработки)
app.use(bodyParser.json()); // парсим JSON-тело запроса
let students = [];
let nextId = 1;

// CRUD эндпоинты

// GET /api/students – получить всех студентов
app.get('/api/students', (req, res) => {
  res.json(students);
});

// POST /api/students – добавить студента
app.post('/api/students', (req, res) => {
  const { name, group } = req.body;
  if (!name || !group) {
    return res.status(400).json({ error: 'Name and group are required' });
  }
  const newStudent = {
    id: nextId++,
    name,
    group,
    dateAdded: new Date().toISOString(),
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /api/students/:id – обновить студента
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, group } = req.body;
  const studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  students[studentIndex] = {
    ...students[studentIndex],
    name: name || students[studentIndex].name,
    group: group || students[studentIndex].group,
  };
  res.json(students[studentIndex]);
});

// DELETE /api/students/:id – удалить студента
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  students.splice(studentIndex, 1);
  res.status(204).send(); 
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});