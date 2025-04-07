const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../dev-data/data/todos.json'); //path to data file
/*const fileContent = fs.readFileSync(dataFilePath, 'utf-8'); //reads the file as a string*/

const toDos = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); //parses the string into real JS array of todo objects

//Handle incoming req & res
const getAllTodos = (req, res) => {
  const { completed, difficulty, page = 1, limit = 10 } = req.query; // req.query contains any query param passed in the URL

  let result = toDos;

  if (completed === 'true' || completed === 'false') {
    const isCompleted = completed === 'true';
    result = result.filter((todo) => todo.completed === isCompleted);
  }

  if (difficulty) {
    result = result.filter((todo) => todo.difficulty === difficulty);
  }

  //Pagination
  let paginated = result;

  if (limit) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit); //query params come as strings -> Nuber to make it an actual nr
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    paginated = result.slice(startIndex, endIndex);
  }

  //res.send(JSON.stringify(toDo));
  res.json({
    success: true,
    data: paginated,
  });
};

const createTodo = (req, res) => {
  const toDoObj = req.body; //gets the new todo data from the req body

  const getNextId = () => {
    if (toDos.length === 0) return '1';

    const lastTodo = toDos[toDos.length - 1];
    return (Number(lastTodo.id) + 1).toString();
  };

  if (toDoObj.hasOwnProperty('todo')) {
    const { todo, difficulty } = toDoObj;

    //skapar ny todo med ID
    const newTodo = {
      id: getNextId(),
      todo,
      difficulty,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    //pushar till listan
    toDos.push(newTodo);

    //overwrite todos.json med nya listan
    fs.writeFileSync(dataFilePath, JSON.stringify(toDos, null, 2));

    //respond to client
    res.json({
      success: true,
      toDos,
    });
  } else {
    res.status(400).json({
      success: false,
      error: 'Wrong data in body',
    });
  }
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  const { completed, difficulty } = req.body; //get new value

  const todo = toDos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  //update fields only if they're included in the body
  if (typeof completed !== 'undefined') {
    todo.completed = completed;
  }

  if (typeof difficulty !== 'undefined') {
    todo.difficulty = difficulty;
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(toDos, null, 2));

  res.status(200).json({
    success: true,
    message: `Todo ${id} updated`,
    todo,
  });
};

const deleteTodo = (req, res) => {
  const id = req.params.id; //get id from url (API URL path)

  const index = toDos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  toDos.splice(index, 1); //removes 1 tiem at that index

  fs.writeFileSync(dataFilePath, JSON.stringify(toDos, null, 2));
  res.json({
    success: true,
    message: `Todo with id ${id} deleted`,
    toDos,
  });
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
