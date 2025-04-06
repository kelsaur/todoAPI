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

- View all todos
- Mark todos as completed
- Filter by completion & difficulty
- Pagination
- Responsive layout using Bootstrap

### API Features (Backend only)

- Create new todo
- Delete a todo
- Edit 'completed' and 'difficulty' via PATCH
- Query support: '?completed=true', '?difficulty=easy', '?page=2&limit=10'

### 📩 API Endpoints

GET /api/todo - Get all todos (supports ?completed=true, difficulty, page, limit)\n
POST /api/todo - Add a new todo\n
PATCH /api/todo/:id - Update completed or difficulty\n
DELETE /api/todo/:id - Delete a todo
