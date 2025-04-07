const todoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      onClick={() => handleToggleCompleted(todo.id, todo.completed)}
      style={{ cursor: 'pointer' }}
    >
      {todo.todo}

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
  );
};
