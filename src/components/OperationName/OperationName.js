import React from 'react';
import { Input } from 'reactstrap';



const OperationName = ({opNum, checked}) => {
    return (
            <div className="form-group">
                <div className="operation label">
                    <label>Operation</label>
                </div>
                <div className="operation input">
                    <Input type="text" name={opNum} bsSize="sm" defaultValue={opNum}/>
                </div>
                 <div className="operation disabled">
                    <p><input type="checkbox" name={opNum} checked={checked} id={opNum}/><label for={opNum}>Disabled</label></p>
                </div> 
            </div>
    )
}

export default OperationName;