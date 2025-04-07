import axios from 'axios';

export const fetchTodos = async (filters) => {
  const query = new URLSearchParams();

  if (filters.completed) query.append('completed', filters.completed);
  if (filters.difficulty) query.append('difficulty', filters.difficulty);
  query.append('page', filters.page || 1);

  const res = await axios.get(`http://localhost:8000/api/todo?${query}`);
  return res.data.data;
};

export const toggleCompleted = async (id, currentStatus) => {
  await axios.patch(`http://localhost:8000/api/todo/${id}`, {
    completed: !currentStatus,
  });
};

export const addTodo = async (todoText, difficulty) => {
  const res = await axios.post('http://localhost:8000/api/todo', {
    todo: todoText,
    difficulty,
  });

  return res.data.toDos; //same as POST response
};

export const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:8000/api/todo/${id}`);
};
