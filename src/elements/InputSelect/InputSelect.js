/* selectBox */
import React, { Component } from "react";
import { Input } from "reactstrap";

//TODO : 처음에 런더링될때 아무것도 셀렉트 되지 않은 상태로만들기 (공백)
const InputSelect = ({ data, onChange, onBlur/* options, name, disabled, onChange */ }) => {
   // console.log(data.choices[0]);
  return (
    <div className={"input select " + data.name}>
      <Input type="select" name={data.name}  onChange={onChange} onBlur={onBlur} bsSize="sm">
        {data.choices.map(( index ) => {
          //(index);
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
