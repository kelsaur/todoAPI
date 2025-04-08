import { useEffect, useState } from 'react';
import '../App.css';
import {
  fetchTodos,
  toggleCompleted,
  addTodo,
  deleteTodo,
} from '../api/todoApi';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import TodoFilters from '../components/TodoFilters';

//useState - holds onto data (todos)
//useEffect - lets us do smth when page loads (eg. fetch)
//axios - lets us make HTTP request (to backend)

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filterCompleted, setFilterCompleted] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [page, setPage] = useState(1);
  const [newTodoText, setNewTodoText] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('easy');

  //fetch data from backend
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos({
          completed: filterCompleted,
          difficulty: filterDifficulty,
          page,
        });

        setTodos(data);
      } catch (err) {
        console.log('Failed to fetch todos: ', err);
      }
    };
    loadTodos();
  }, [filterCompleted, filterDifficulty, page, showAll]);

  //use PATCH endpoint
  const handleToggleCompleted = async (id, currentStatus) => {
    //check if the id exists first, otherwise patch will get triggered on DELETE
    const exists = todos.find((todo) => todo.id === id);
    if (!exists) return;

    try {
      await toggleCompleted(id, currentStatus); //patch it on backend

      //update UI
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
      const newTodos = await addTodo(newTodoText, newDifficulty);

      setNewTodoText('');
      setNewDifficulty('');
      setTodos(newTodos);
    } catch (err) {
      console.log('Failed to add todo: ', err);
    }
  };

  //use DELETE endpoint
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id); //call API
      setTodos((prev) => prev.filter((todo) => todo.id !== id)); //update UI
    } catch (err) {
      console.log('Failed to delete todo: ', err);
    }
  };
  return (
    <>
      <h1>My todos</h1>

      <TodoFilters
        filterCompleted={filterCompleted}
        setFilterCompleted={setFilterCompleted}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
        page={page}
        setPage={setPage}
        setShowAll={setShowAll}
      />

      <TodoForm
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
        newDifficulty={newDifficulty}
        setNewDifficulty={setNewDifficulty}
        handleAddTodo={handleAddTodo}
      />

      <TodoList
        todos={todos}
        onToggle={handleToggleCompleted}
        onDelete={handleDeleteTodo}
      />
    </>
  );
};

export default Todos;
