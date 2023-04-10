import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const StyledTodoListContainer = styled.div`
  width: 100%;
  overflow: auto;
`;

function TodoList({ taskList, setTaskList }) {
  const [modal, setModal] = useState(false);
  // const [taskList, setTaskList] = useState([]);

  //localstorage에 저장해두었던 내역을 처음 렌더할 때 불러온다.
  // useEffect(() => {
  //   let arr = localStorage.getItem("taskList");
  //   if (arr) {
  //     let obj = JSON.parse(arr);
  //     setTaskList(obj);
  //   }
  // }, []);

  //react와 로컬호스트번호가 달라야 한다.
  //json으로 데이터 불러오기
  // useEffect(() => {
  //   fetch("http://localhost:3002/data")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setTaskList(data);
  //     });
  // }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const updateListArr = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    fetch(`http://localhost:3002/data/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        //배열이나 객체는 prev로 업데이트 해주는 게 좋아요~~~~
        setTaskList((prev) => [...tempList]);
        setModal(false);
      })
      .catch((err) => console.log(err));
    //👇🏻 localStorage 썼을 때
    // localStorage.setItem("taskList", JSON.stringify(tempList));
    // window.location.reload();
  };

  const deleteTask = (index) => {
    let id = taskList[index].id;
    fetch(`http://localhost:3002/data/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("삭제되었습니다!!!");
        }
      })
      .catch((err) => console.log(err));
    //then 안에 쓰지 않는 이유 -> fetch가 비동기라서, 우선 setTaskList 필터한거 보여주는 동안 fetch 처리되게 하면
    //빠르게 반영할 수 있쥐!!!!!
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    taskList.push(taskObj);
    setTaskList(tempList);
    setModal(false); //task 다 적은 다음에 모달이 닫히게 함
  };

  return (
    <StyledTodoListContainer>
      <div className="header">
        <h1>🌟 TO DO LIST 🌟</h1>
        <button className="add-btn" onClick={() => setModal(true)}>
          + ADD TASK
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArr={updateListArr}
            />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} saveTask={saveTask} />
    </StyledTodoListContainer>
  );
}

export default TodoList;
