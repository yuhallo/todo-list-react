import "./App.css";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

const PageConstruct = styled.div`
  display: flex;
`;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/data")
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data);
      });
  }, []);

  return (
    <PageConstruct>
      <Navbar setTaskList={setTaskList} handleSearch={setSearchText} />
      <TodoList
        taskList={taskList.filter(
          (taskObj) =>
            taskObj.description.toLocaleLowerCase().includes(searchText) ||
            taskObj.taskName.toLocaleLowerCase().includes(searchText)
        )}
        setTaskList={setTaskList}
      />
    </PageConstruct>
  );
}

export default App;
