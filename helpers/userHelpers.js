const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../dev-data/data/users.json');

//load users from JSON file
const loadUsers = () => {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
};

//save users  TO json file
const saveUsers = (users) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};

module.exports = { loadUsers, saveUsers };
