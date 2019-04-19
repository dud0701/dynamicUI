/* Number */
import React, { Component } from "react";
import { Input } from "reactstrap";



const InputNumber = ({
  data,
  value,
  name,
  disabled,
  onChange,
  min_value,
  max_value
}) => {
  return (
    <div className={"input number " + data.name}>
      <Input
        type="number"
        step="1"
        min={data.min_value}
        max={data.max_value}
        disabled={disabled}
        name={data.name}
        onChange={onChange}
        value={data.value}
        bsSize="sm"
      />
    </div>
  );
};

export default InputNumber;
