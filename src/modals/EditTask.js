import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function EditTask({ modal, setModal, toggle, updateTask, taskObj }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName") setTaskName(value);
    else setDescription(value);
  };

  useEffect(() => {
    setTaskName(taskObj.taskName);
    setDescription(taskObj.description);
  }, []);

  const handelUpdate = (e) => {
    e.preventDefault();
    let tempObj = { ...taskObj, taskName, description };
    // tempObj["id"] = taskObj.id;
    // tempObj["Name"] = taskName;
    // tempObj["Description"] = description;
    setModal(false);
    updateTask(tempObj);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>UPDATE TASK</ModalHeader>
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
            color="primary"
            onClick={handelUpdate}
            style={{ "background-color": "#7AC9F1", "border-radius": "30px" }}
          >
            ✏️ Edit
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

export default EditTask;
