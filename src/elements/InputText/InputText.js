/* 기본 inputBox */
import React, { Component } from "react";
import { Input } from "reactstrap";

const InputText = ({ data, value, name, disabled, onChange, onBlur, onTextInput, idx, dataType }) => {
  return (
    <div className={"input text " + data.name}>
      <Input
        disabled={disabled}
        name={data.name}
        value={data.value}
        onBlur={onBlur}
        onChange={(e) => onTextInput(e,idx,dataType)}
        bsSize="sm"
      />
    </div>
  );
};

export default InputText;
 