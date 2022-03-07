import { Component } from "react";
import React from "react";
import Button from "./Button/Button";
import "./TaskContainer.css";
import PropTypes from "prop-types";

class TaskContainer extends Component {
  doneHandler = () => {
    this.props.doneTask();
  };
  editHandler = () => {
    this.props.editTask();
  };
  deleteHandler = () => {
    this.props.deleteTask();
  };
  render() {
    const { taskvalue } = this.props;
    const { value, status } = taskvalue;
    return (
      <div className="task_container">
        <p className={status ? "done_task" : "not_done"}>{value}</p>
        <Button
          type="button"
          onClick={this.doneHandler}
          classname="doneButton"
          label="Done"
        />

        <Button
          type="button"
          onClick={this.editHandler}
          classname="editButton"
          label="Edit"
        />

        <Button
          type="button"
          onClick={this.deleteHandler}
          classname="deleteButton"
          label="Delete"
        />
      </div>
    );
  }
}

TaskContainer.propTypes = {
  index: PropTypes.number,
  taskvalue: PropTypes.object,
  deleteTask: PropTypes.func,
  doneTask: PropTypes.func,
  editTask: PropTypes.func,
};

TaskContainer.defaultProps = {
  index: Math.floor(Math.random()*100),
  taskvalue: {value: 'No Any Task' , status: false},
  doneTask:()=>{console.log('done Task')},
  deleteTask: ()=>{console.log('delete task')},
  editTask:()=>{console.log('edit task')}
}

export default React.memo(TaskContainer);
