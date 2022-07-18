import './App.css';
import { Title } from "./compornents/Title";
import { InputForm } from "./compornents/InputForm"
import { TodoList } from "./compornents/TodoList";
import { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState([]);

  return (
    <div className="body">
      <Title />
      <div className="set">
        <InputForm taskList={taskList} setTaskList={setTaskList} />
        <TodoList taskList={taskList} setTaskList={setTaskList} />
      </div>
    </div>
  );
}

export default App;
