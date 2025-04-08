// components/TodoItem.jsx
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      onClick={() => onToggle(todo.id, todo.completed)}
      className={`list-group-item d-flex justify-content-between align-items-start ${
        todo.completed ? 'list-group-item-success' : ''
      }`}
      style={{ cursor: 'pointer' }}
    >
      <span>{todo.todo}</span>

      <div className="d-flex">
        <span
          className={`badge d-flex justify-content-center align-items-center ${
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
          onClick={(e) => {
            e.stopPropagation(); //prevent toggle when deleting
            onDelete(todo.id);
          }}
          style={{ cursor: 'pointer' }}
        >
          <i className="bi bi-trash ms-3"></i>
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
