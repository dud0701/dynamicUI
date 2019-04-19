/* 기본 inputBox */
import React, { Component } from "react";
import { Input } from "reactstrap";

const InputText = ({ data, value, name, disabled, onChange }) => {
  return (
    <div className={"input text " + data.name}>
      <Input
        disabled={disabled}
        name={data.name}
        onChange={onChange}
        value={data.value}
        bsSize="sm"
      />
    </div>
  );
};

export default InputText;
