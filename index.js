const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.json());

const dataFilePath = path.join(__dirname, '/dev-data/data/users.json');

//Helpers

const loadUsers = () => {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
  users = JSON.parse(fileContent);
};

const saveUsers = (users) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};

// ENDPOINTS

// signup
app.post('/api/signup', (req, res) => {
  const { username, password, email } = req.body;

  const users = loadUsers();

  const usernameExists = users.some((user) => user.username === username);
  const emailExists = users.some((user) => user.email === email);
  const success = !usernameExists && !emailExists;

  if (success) {
    users.push({ username, password, email });
    saveUsers();
  }

  res.json({ success, usernameExists, emailExists });
});

// login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const users = loadUsers();
  const found = users.find(
    (user) => user.username === username && user.password === password
  );

  res.json({ success: !!found });
});

// SERVER
app.listen(PORT, () => {
  console.log(`Server's running on http://localhost:${PORT}`);
});
