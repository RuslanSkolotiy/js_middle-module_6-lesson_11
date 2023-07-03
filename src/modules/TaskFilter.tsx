import { useDispatch, useSelector } from "react-redux";
import { filterSelected, toggleFilter } from "src/store/taskSlice";

import "./styles.css";

export const TaskFilter = () => {
  const dispatch = useDispatch();
  const selected = useSelector(filterSelected);

  const onChangeHandler = () => {
    dispatch(toggleFilter());
  };

  return (
    <div className="new-task-bar">
      <input
        type="checkbox"
        value="true"
        onChange={onChangeHandler}
        checked={selected}
        id="filter-checkbox"
        data-testid="filter-checkbox"
      />
      <label htmlFor="filter-checkbox">Только выполненные</label>
    </div>
  );
};
