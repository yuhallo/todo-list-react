import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import "./card.css";

function Card({ taskObj, index, deleteTask, updateListArr }) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const updateTask = (obj) => {
    updateListArr(obj, index);
  };

  const onChecked = () => {
    updateListArr({ ...taskObj, complete: !taskObj.complete }, index);
  };

  return (
    <div
      className={!taskObj.complete ? "card-wrapper" : "checked-card-wrapper"}
    >
      <div className="card-container">
        <div className="card-header">
          <span
            className={!taskObj.complete ? "task-title" : "checked-task-title"}
          >
            {taskObj.taskName}
          </span>
          <input
            className="check-mark"
            type={"checkbox"}
            onClick={onChecked}
            checked={taskObj.complete}
          />
          {/* {taskObj.complete && "completed"} */}
        </div>
        <p className="card-contents">{taskObj.description}</p>

        <div
          className={!taskObj.complete ? "card-footer" : "checked-card-footer"}
        >
          <i
            className="far fa-edit "
            style={{
              "margin-right": "10px",
            }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fas fa-trash-alt "
            onClick={() => {
              handleDelete(index);
            }}
          ></i>
        </div>
      </div>
      <EditTask
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
}

export default Card;
