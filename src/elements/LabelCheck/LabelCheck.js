import React, { Component } from "react";
import { CustomInput, Label } from "reactstrap";

/* const LabelCheck = ({ data,name, onChange, disabled, onBlur, handleChecked }) => {
  return (
    <div className={"label check " + data.name}>
        <CustomInput type="checkbox" onChange={handleChecked} onBlur={onBlur}><label>{data.name}</label></CustomInput>
    </div>
  );
};
 */
class LabelCheck extends Component {
  state = {
    isChecked : true
  }

  handleChecked = () => {
    const { handleDisable } = this.props;
    console.log("::checked!");
    this.setState({
      isChecked : !this.state.isChecked
    })
    handleDisable();

  }


  render () {
    const { data, onBlur } = this.props;
    const { handleChecked } = this;
    const { isChecked } = this.state;
    return(
      <div className={"label check " + data.name }>
      <CustomInput type="checkbox" onChange={handleChecked} onBlur={onBlur} checked={isChecked}><label>{data.name}</label></CustomInput>
  </div>
    );
  }
}

export default LabelCheck;
