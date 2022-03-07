// import { Component } from "react";
// import React from "react";
// import Button from "./Button/Button";
// import TaskContainer from "./TaskContainer";
// import "./InputContainer.css";

// class InputContainer extends Component {
//   constructor() {
//     super();
//     this.state = { inputvalue: "", taskList: [], addbuttonStatus: true };
//   }

//   componentDidMount() {

//     let list = JSON.parse(localStorage.getItem("todo"));
//     if (list != null) {
//       this.setState({ taskList: list });
//     }
//   }

//   addTaskHandler = ()=> {
//     const{inputvalue}=this.state;
//     this.setState({ addbuttonStatus: true });
//     if (inputvalue === "") {
//       alert("Task Field Can't be Empty!!");
//       return false;
//     }
//     let list = this.state.taskList;

//     list.push({ value: inputvalue, status: false });
//     localStorage.setItem("todo", JSON.stringify(list));
//     this.setState({ taskList: list });
//     this.setState({ inputvalue: "" });
//   }

//   changehandler= (event) =>{
//     this.setState({ inputvalue: event.target.value });
//   }

//   deleteTaskHandler = (index)=> {
//     let list = this.state.taskList;
//     list.splice(index, 1);
//     localStorage.setItem("todo", JSON.stringify(list));
//     this.setState({ taskList: list });
//   }

//   doneTaskHandler = (index)=> {
//     let list = this.state.taskList;
//     list[index] = { value: list[index].value, status: true };
//     localStorage.setItem("todo", JSON.stringify(list));
//     this.setState({ taskvalue: list });
//   }

//   editTaskHandler = (index)=> {
//     let list = this.state.taskList;
//     if (list[index].status) {
//       alert("This Task is Already Done");
//       return;
//     }
//     let value = list[index].value;
//     list.splice(index, 1);
//     localStorage.setItem("todo", JSON.stringify(list));
//     this.setState({
//       inputvalue: value,
//       taskvalue: list,
//       addbuttonStatus: false,
//     });
//   }

//   render() {
//     const{inputvalue, taskList, addbuttonStatus}=this.state;
//     return (
//       <div>
//         <input
//           type={"text"}
//           className="input"
//           placeholder="Enter New Task"
//           value={inputvalue}
//           onChange={this.changehandler}
//         />
//         <Button
//           type={"button"}
//           onClick={this.addTaskHandler}
//           classname="addButton"
//           label={addbuttonStatus ? "Add Task" : "Edit Task"}
//         />

//         {taskList.map((task, index) => {
//           return (
//             <TaskContainer
//               key={index}
//               index={index}
//               taskvalue={task}
//               deleteTask={() => this.deleteTaskHandler(index)}
//               doneTask={() => this.doneTaskHandler(index)}
//               editTask={() => this.editTaskHandler(index)}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default React.memo(InputContainer);

///........ update.......//

import { Component } from "react";
import React from "react";
import Button from "./Button/Button";
import "./InputContainer.css";
import PropTypes from "prop-types";

class InputContainer extends Component {
  constructor() {
    super();
    this.state = { inputIsValid: true };
  }
  addTaskHandler = () => {
    const { inputvalue, addbuttonStatus } = this.props;
    if (inputvalue === "") {
      this.setState({ inputIsValid: false });
      return;
    }
    let list = JSON.parse(localStorage.getItem("todo"));
    if(list==null){
      list=[];
    }
    list.push({ value: inputvalue, status: false });
    localStorage.setItem("todo", JSON.stringify(list));
    this.props.onChangeTaskList(list);
    if (!addbuttonStatus) {
      this.props.onChangeButtonStatus();
    }
    this.props.onChangeInputValue("");
  };

  changehandler = (event) => {
    if (!this.state.inputIsValid) {
      this.setState({ inputIsValid: true });
    }
    setTimeout(this.props.onChangeInputValue(event.target.value), 1000);
  };

  render() {
    const { inputIsValid } = this.state;
    const { inputvalue, addbuttonStatus } = this.props;

    return (
      <div>
        <input
          type={"text"}
          className="input"
          placeholder="Enter New Task"
          value={inputvalue}
          onChange={this.changehandler}
        />
        <Button
          type={"button"}
          onClick={this.addTaskHandler}
          classname="addButton"
          label={addbuttonStatus ? "Add Task" : "Edit Task"}
        />
        {!inputIsValid && <p className="error">Task must not be empty!!</p>}
      </div>
    );
  }
}

InputContainer.propTypes = {
  inputvalue: PropTypes.string,
  addbuttonStatus: PropTypes.bool,
  onChangeTaskList: PropTypes.func,
  onChangeButtonStatus: PropTypes.func,
  onChangeInputValue: PropTypes.func,
};

InputContainer.defaultProps = {
  inputvalue: "",
  addbuttonStatus: true,
  onChangeTaskList: () => {
    console.log("list changed!");
  },
  onChangeButtonStatus: () => {
    console.log("button status changed!");
  },
  onChangeInputValue: () => {
    console.log("input value changed!");
  },
};
export default React.memo(InputContainer);
