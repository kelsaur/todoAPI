const TodoFilters = ({
  filterCompleted,
  setFilterCompleted,
  filterDifficulty,
  setFilterDifficulty,
  page,
  setPage,
}) => {
  return (
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
  );
};

export default TodoFilters;
