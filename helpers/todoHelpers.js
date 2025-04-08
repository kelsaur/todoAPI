const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../dev-data/data/todos.json');

const saveTodos = (todos) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2));
};

module.exports = { saveTodos };
