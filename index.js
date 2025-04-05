const express = require('express'); //web server library
const path = require('path'); //safely build file paths
const fs = require('fs'); //read/write files
const app = express(); //my actual server
const PORT = 8000; //the door my app listens on

app.use(express.json()); //tolkar allt i body som JSON - middleware
//säger till express: “If someone sends me JSON (like from Postman), parse it and put it in req.body.”

const dataFilePath = path.join(__dirname, 'dev-data', 'data', 'todos.json'); //path to data file

const fileContent = fs.readFileSync(dataFilePath, 'utf-8'); //reads the file as a string
const toDos = JSON.parse(fileContent); //parses the string into real JS array of todo objects

//ROUTES - API endpoints
app.get('/api/todo', (req, res) => {
  const { completed, difficulty, page = 1, limit = 5 } = req.query; // req.query contains any query param passed in the URL

  let result = toDos;

  if (completed === 'true' || completed === 'false') {
    const isCompleted = completed === 'true';
    result = result.filter((todo) => todo.completed === isCompleted);
  }

  if (difficulty) {
    result = result.filter((todo) => todo.difficulty === difficulty);
  }

  //Pagination
  const pageNum = Number(page);
  const limitNum = Number(limit); //query params come as strings -> Nuber to make it an actual nr
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginated = result.slice(startIndex, endIndex);

  //res.send(JSON.stringify(toDo));
  res.json({
    success: true,
    total: result.length,
    page: pageNum,
    limit: limitNum,
    data: paginated,
  });
});

app.post('/api/todo', (req, res) => {
  const toDoObj = req.body; //gets the new todo data from the req body

  const getNextId = () => {
    if (toDos.length === 0) return '1';

    const lastTodo = toDos[toDos.length - 1];
    return (Number(lastTodo.id) + 1).toString();
  };

  if (toDoObj.hasOwnProperty('todo')) {
    const { todo } = toDoObj;

    //skapar ny todo med ID
    const newTodo = {
      id: getNextId(),
      todo,
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
});

app.patch('/api/todo/:id', (req, res) => {
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
});

app.delete('/api/todo/:id', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log('Servern startad');
});
