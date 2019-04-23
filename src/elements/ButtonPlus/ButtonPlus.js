import React, { Component } from "react";
import {Button} from 'reactstrap';

const ButtonPlus = ({ onChange, name, onBlur }) => {
    return(
        <div className={"button plus " + name}>
            <Button outline color="secondary" onBlur={onBlur}>+</Button>
        </div>
    )
}

export default ButtonPlus;