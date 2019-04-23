import React,{ Component } from 'react';
import { Input, Label } from 'reactstrap'; 

const LabelRadio = ({ data, name, onChange, disabled, onBlur }) => {
    return(
        <div className={"label radio " + data.name}>
            <Label check>
                <Input 
                    type="radio" 
                    name={data.name} 
                    onChange={onChange} 
                    disabled={disabled}
                    onBlur={onBlur}
                    /> 
                    {data.name}
            </Label>
        </div>
    )
}

export default LabelRadio;