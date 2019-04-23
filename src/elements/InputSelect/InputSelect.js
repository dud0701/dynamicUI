/* selectBox */
import React, { Component } from "react";
import { Input } from "reactstrap";

//TODO : 처음에 런더링될때 아무것도 셀렉트 되지 않은 상태로만들기 (공백)
const InputSelect = ({ 
  data, 
  onChange, 
  onBlur, 
  onTextInput, 
  idx, 
  dataType/* options, name, disabled, onChange */ }) => {
  return (
    <div className={"input select " + data.name}>
      <Input type="select" 
      name={data.name} 
      onChange={(e) => onTextInput(e,idx,dataType)} 
      value={data.value} 
      onBlur={onBlur}
     /*  disabled={dataType === "options" ? true : false} */ 
      bsSize="sm">
        <option value="" selected disabled hidden>Select an Option</option>
        {data.choices.map(( index ) => {
          return (
            <option value={index}>
              {index}
            </option>
          );
        })}
      </Input>
    </div>
  );
};

export default InputSelect;
