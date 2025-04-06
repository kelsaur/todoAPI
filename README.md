### ⚒️ Tech Stack

#### Backend

- **Node.js**
- **Express**
- **File system (`fs`)** – to store data in a local `todos.json` file
- **CORS** – to allow frontend-backend communication

#### Frontend

- **React (with Vite)**
- **Axios** – for HTTP requests
- **Bootstrap** – for styling and layout

### 🎉 Features

### UI Features (Frontend)

- View todos
- Create new todos
- Delete todos
- Mark todos as completed
- Filter by completion & difficulty
- Pagination
- Responsive layout with Bootstrap

### API Features (Backend)

- Full CRUD (Create, Read, Update, Delete)
- Edit 'completed' and/or 'difficulty' via PATCH
- Query support:
  -'?completed=true'
  - '?difficulty=easy'
  - '?page=2&limit=10'

### 📩 API Endpoints

- GET /api/todo - Get all todos (supports query params)
- POST /api/todo - Add a new todo
- PATCH /api/todo/:id - Update 'completed' and/or 'difficulty'
- DELETE /api/todo/:id - Delete a todo
