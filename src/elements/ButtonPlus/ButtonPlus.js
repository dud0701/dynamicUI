import React, { Component } from "react";
import {Button} from 'reactstrap';

const ButtonPlus = ({ onChange, name }) => {
    return(
        <div className={"button plus " + name}>
            <Button outline color="secondary">+</Button>
        </div>
    )
}

export default ButtonPlus;