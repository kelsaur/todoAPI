import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
