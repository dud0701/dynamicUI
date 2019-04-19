import React,{ Component } from 'react';
import { Input, Label } from 'reactstrap'; 

const LabelRadio = ({ data, name, onChange, disabled }) => {
    return(
        <div className={"label radio " + data.name}>
            <Label check>
                <Input 
                    type="radio" 
                    name={data.name} 
                    onChange={onChange} 
                    disabled={disabled}/> 
                    {data.name}
            </Label>
        </div>
    )
}

export default LabelRadio;