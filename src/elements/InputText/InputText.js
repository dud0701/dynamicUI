/* 기본 inputBox */
import React, { Component } from "react";
import { Input } from "reactstrap";

const InputText = ({ data, onBlur, onTextInput, idx, dataType }) => {
  return (
    <div className={"input text " + data.name}>
      <Input
        /* disabled={dataType === "options" ? true : false} */
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
 