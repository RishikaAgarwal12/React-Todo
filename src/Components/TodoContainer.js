import { Component } from "react";
import InputContainer from "./InputContainer";
import TaskContainer from "./TaskContainer";
class TodoContainer extends Component {
  constructor() {
    super();
    this.state = { inputvalue: "", taskList: [], addbuttonStatus: true };
  }

  componentDidMount() {
    let list = JSON.parse(localStorage.getItem("todo"));
    if (list != null) {
      this.setState({ taskList: list });
    }
  }

  deleteTaskHandler = (index) => {
    let list = this.state.taskList;
    list.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(list));
    this.setState({ taskList: list });
  };

  doneTaskHandler = (index) => {
    let list = this.state.taskList;
    list[index] = { value: list[index].value, status: true };
    localStorage.setItem("todo", JSON.stringify(list));
    this.setState({ taskvalue: list });
  };

  editTaskHandler = (index) => {
    let list = this.state.taskList;
    if (list[index].status) {
      alert("This Task is Already Done");
      return;
    }
    let value = list[index].value;
    list.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(list));
    this.setState({
      taskvalue: list,
      addbuttonStatus: false,
      inputvalue: value,
    });
  };

  onChangeButtonStatusHandler = () => {
    this.setState({ addbuttonStatus: true });
  };

  onChangeTaskListHandler = (list) => {
    this.setState({ taskList: list });
  };

  onChangeInputValueHandler = (value) => {
    this.setState({ inputvalue: value });
  };

  render() {
    const { inputvalue, taskList, addbuttonStatus } = this.state;
    return (
      <div>
        <InputContainer
          inputvalue={inputvalue}
          addbuttonStatus={addbuttonStatus}
          onChangeTaskList={this.onChangeTaskListHandler}
          onChangeButtonStatus={this.onChangeButtonStatusHandler}
          onChangeInputValue={this.onChangeInputValueHandler}
        />
        {taskList.map((task, index) => {
          return (
            <TaskContainer
              key={index}
              index={index}
              taskvalue={task}
              deleteTask={() => this.deleteTaskHandler(index)}
              doneTask={() => this.doneTaskHandler(index)}
              editTask={() => this.editTaskHandler(index)}
            />
          );
        })}
      </div>
    );
  }
}
export default TodoContainer;
