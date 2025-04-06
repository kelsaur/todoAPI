import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

//useState - holds onto data (todos)
//useEffect - lets us do smth when page loads (eg. fetch)
//axios - lets us make HTTP request (to backend)

function App() {
  const [todos, setTodos] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filterCompleted, setFilterCompleted] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [page, setPage] = useState(1);
  const [newTodoText, setNewTodoText] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('easy');

  //fetch data from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const query = new URLSearchParams();

        if (filterCompleted) query.append('completed', filterCompleted);
        if (filterDifficulty) query.append('difficulty', filterDifficulty);
        query.append('page', page);

        const res = await axios.get(`http://localhost:8000/api/todo?${query}`);
        setTodos(res.data.data);
      } catch (err) {
        console.log('Failed to fetch todo: ', err);
      }
    };
    fetchTodos();
  }, [filterCompleted, filterDifficulty, page, showAll]);

  //use PATCH endpoint
  const toggleCompleted = async (id, currentStatus) => {
    //check if the id exists first, otherwise patch will get triggered on DELETE
    const exists = todos.find((todo) => todo.id === id);
    if (!exists) return;

    try {
      await axios.patch(`http://localhost:8000/api/todo/${id}`, {
        completed: !currentStatus,
      });

      setTodos((prev) =>
        prev.map((todo) =>
          //find todo with matching ID and change completed value to opposite, leave other todos unchanged
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (err) {
      console.log('Failed to update todo: ', err);
    }
  };

  //use POST endpoint
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/todo', {
        todo: newTodoText,
        difficulty: newDifficulty,
      });

      setNewTodoText('');
      setNewDifficulty('');

      setTodos(res.data.toDos); //same as POST response
    } catch (err) {
      console.log('Failed to add todo: ', err);
    }
  };

  //use DELETE endpoint
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/${id}`);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log('Failed to delete todo: ', err);
    }
  };
  return (
    <>
      <h1>My todos</h1>

      <div className="d-flex gap-3 mb-4 align-items-center">
        {/*Show all*/}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setFilterCompleted('');
            setFilterDifficulty('');
            setPage(1);
            setShowAll(true);
          }}
        >
          Show All
        </button>

        {/*Completed filter*/}
        <select
          value={filterCompleted}
          onChange={(e) => {
            setFilterCompleted(e.target.value);
            setShowAll(false);
          }}
          className="form-select w-auto"
        >
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>

        {/*Difficulty filter*/}
        <select
          value={filterDifficulty}
          onChange={(e) => {
            setFilterDifficulty(e.target.value);
            setShowAll(false);
          }}
          className="form-select w-auto"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="challenging">Challenging</option>
        </select>

        {/*Pagination*/}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            setPage((p) => Math.max(1, p - 1));
            setShowAll(false);
          }}
        >
          PREV
        </button>
        <span>Page {page}</span>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            setPage((p) => p + 1);
            setShowAll(false);
          }}
        >
          NEXT
        </button>
      </div>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New todo..."
          className="form-control"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <div className="dropdown">
          <select
            className="form-select w-auto"
            value={newDifficulty}
            onChange={(e) => setNewDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="challenging">Challenging</option>
          </select>
        </div>
        <button className="btn btn-success" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-start ${
              todo.completed ? 'list-group-item-success' : ''
            }`}
          >
            <span
              onClick={() => toggleCompleted(todo.id, todo.completed)}
              style={{ cursor: 'pointer' }}
            >
              {todo.todo}
            </span>
            {/*<span>{todo.completed ? 'Done!' : 'Not Done!'}</span>*/}
            <div className="d-flex ">
              <span
                className={`badge d-flex justify-content-center align-items-centern ${
                  todo.difficulty === 'easy'
                    ? 'bg-success'
                    : todo.difficulty === 'medium'
                    ? 'bg-warning text-dark'
                    : todo.difficulty === 'challenging'
                    ? 'bg-danger'
                    : 'bg-secondary'
                }`}
              >
                {todo.difficulty}
              </span>
              <span
                onClick={() => handleDeleteTodo(todo.id)}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-trash ms-3"></i>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
