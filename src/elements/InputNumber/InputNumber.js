/* Number */
import React, { Component } from "react";
import { Input } from "reactstrap";



const InputNumber = ({
  data,
  disabled,
  onChange,
  onBlur,
  dataType
}) => {
  return (
    <div className={"input number " + data.name}>
      <Input
        type="number"
        step="1"
        min={data.min_value}
        max={data.max_value}
        /* disabled={dataType === "options" ? true : false} */
        name={data.name}
        onChange={onChange}
        value={data.value}
        onBlur={onBlur}
        bsSize="sm"
      />
    </div>
  );
};

export default InputNumber;
