const TodoForm = ({
  newTodoText,
  setNewTodoText,
  newDifficulty,
  setNewDifficulty,
  handleAddTodo,
}) => {
  return (
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
  );
};

export default TodoForm;
