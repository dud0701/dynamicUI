import React, { Component } from "react";
import { CustomInput, Label } from "reactstrap";

const LabelCheck = ({ data,name, onChange, disabled, onBlur }) => {
  return (
    <div className={"label check " + data.name}>
        <CustomInput type="checkbox" onChange={onChange} onBlur={onBlur}><label>{data.name}</label></CustomInput>
    </div>
  );
};

export default LabelCheck;
