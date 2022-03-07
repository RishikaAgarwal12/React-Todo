import { Component } from "react";
import "./Button.css";
import PropTypes from "prop-types";
class Button extends Component {
 
  render() {
    const{type, classname , onClick, label} = this.props;
    return (
      <button
        type={type}
        className={classname}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  type : PropTypes.string,
  classname : PropTypes.string,
  onClick : PropTypes.func,
  label : PropTypes.string
}

Button.defaultProps = {
  type:'button',
  classname : 'button',
  onClick : ()=>console.log('button Clicked!!'),
  label : 'Button'
}


export default Button;
