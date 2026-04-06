const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your-secret-key-change-it'; // в реальном проекте храните в .env

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ----- Хранилище данных -----
let students = [];
let nextId = 1;

// Временное хранилище пользователей (для демо)
const users = [
  { id: 1, login: 'admin', password: 'admin', name: 'Администратор' }
];

// ----- Middleware для проверки JWT -----
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Недействительный токен' });
    req.user = user;
    next();
  });
};

// ----- Маршруты авторизации -----

// Логин: получение JWT
app.post('/api/auth/login', (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Неверный логин или пароль' });
  }
  const token = jwt.sign(
    { id: user.id, login: user.login, name: user.name },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Получение информации о текущем пользователе (защищённый маршрут)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ id: req.user.id, login: req.user.login, name: req.user.name });
});

// ----- CRUD для студентов (все маршруты защищены) -----

// GET /api/students
app.get('/api/students', authenticateToken, (req, res) => {
  res.json(students);
});

// POST /api/students
app.post('/api/students', authenticateToken, (req, res) => {
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

// PUT /api/students/:id
app.put('/api/students/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, group } = req.body;
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  students[index] = { ...students[index], name, group };
  res.json(students[index]);
});

// DELETE /api/students/:id
app.delete('/api/students/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });
  students.splice(index, 1);
  res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});