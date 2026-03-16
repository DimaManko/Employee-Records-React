import "./app-filter.css";

const AppFilter = (props) => {
  const { onFilterPost, filter } = props;
  const onFilterEmp = (e) => {
    const filter = e.currentTarget.getAttribute("data-filter");
    onFilterPost(filter);
  };
  return (
    <div className="btn-group">
      <button
        className={`btn ${filter === "all" ? "btn-light" : "btn-outline-light"}`}
        type="button"
        data-filter="all"
        onClick={onFilterEmp}
      >
        Все сотрудники
      </button>
      <button
        className={`btn ${filter === "rise" ? "btn-light" : "btn-outline-light"}`}
        type="button"
        onClick={onFilterEmp}
        data-filter="rise"
      >
        На повышение
      </button>
      <button
        className={`btn ${filter === "moreThan1000" ? "btn-light" : "btn-outline-light"}`}
        type="button"
        data-filter="moreThan1000"
        onClick={onFilterEmp}
      >
        З/П болльше 1000$
      </button>
    </div>
  );
};

export default AppFilter;
