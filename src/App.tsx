import { store } from "./store/configureStore";

import "./styles.css";
import { NewTaskBar } from "./modules/NewTaskBar";
import { TaskList } from "./modules/TaskList";
import { Provider } from "react-redux";
import { NotifierContainer } from "./modules/NotifierContainer";
import { TaskFilter } from "./modules/TaskFilter";


export const App = () => {
  return (
    <div className="root-container">
      <Provider store={store}>
        <h3>Список задач</h3>
        <NewTaskBar />
        <TaskFilter />
        <TaskList />
        <NotifierContainer />
      </Provider>
    </div>
  );
};
