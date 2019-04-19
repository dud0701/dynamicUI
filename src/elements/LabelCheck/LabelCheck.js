import React, { Component } from "react";
import { CustomInput, Label } from "reactstrap";

const LabelCheck = ({ data,name, onChange, disabled }) => {
  return (
    <div className={"label check " + data.name}>
        <CustomInput type="checkbox" onChange={onChange}><label>{data.name}</label></CustomInput>
    </div>
  );
};

export default LabelCheck;
