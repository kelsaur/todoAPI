const { loadUsers, saveUsers } = require('../helpers/userHelpers');

// signup
const signUp = (req, res) => {
  const { username, password, email } = req.body;

  const users = loadUsers();

  const usernameExists = users.some((user) => user.username === username);
  const emailExists = users.some((user) => user.email === email);
  const success = !usernameExists && !emailExists;

  if (success) {
    users.push({ username, password, email });
    saveUsers(users);
  }

  res.json({ success, usernameExists, emailExists });
};

// login
const logIn = (req, res) => {
  const { username, password } = req.body;

  const users = loadUsers();
  const found = users.find(
    (user) => user.username === username && user.password === password
  );

  res.json({ success: !!found });
};

module.exports = {
  signUp,
  logIn,
};
