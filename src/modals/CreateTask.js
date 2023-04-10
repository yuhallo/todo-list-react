import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CreateTask({ modal, toggle, saveTask }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") setTaskName(value);
    else setDescription(value);
  };

  const handelSave = () => {
    let taskObj = {};
    taskObj["id"] = Date.now();
    taskObj["taskName"] = taskName;
    taskObj["description"] = description;
    taskObj["complete"] = false;
    fetch(`http://localhost:3002/data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj),
    }).then((res) => {
      saveTask(taskObj);
      setTaskName("");
      setDescription("");
    });
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>ADD TASK</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label>Task Name</label>
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={handleChange}
                name="taskName"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                className="form-control"
                value={description}
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ "background-color": "#8BB897", "border-radius": "30px" }}
            onClick={handelSave}
          >
            🗓️ Add
          </Button>{" "}
          <Button
            color="secondary"
            onClick={toggle}
            style={{ "border-radius": "30px" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateTask;
