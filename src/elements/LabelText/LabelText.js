import React,{ Component } from 'react';
import {Label} from 'reactstrap';

const LabelText = ({ data, disabled }) => {
   // console.log("data : " + data);
    return (
        <div className={"label text " + data.name}>
            <Label disabled={disabled}>{data.name}</Label>
        </div>
    )
}

export default LabelText;