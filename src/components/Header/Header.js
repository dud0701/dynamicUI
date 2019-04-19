import React, { Component } from 'react';
import Select, {  components } from 'react-select';
import SelectBoxWithImage from '../SelectBoxImage/SelectBoxImage';
import OperationName from '../OperationName/OperationName';

const Header = ({opType, onChange, operations, operation, onOpChange }) => {
 
    return (

        <div className="headTemplate">
        <div className="selects">
            <div className="head-select">
                <Select options={opType} onChange={onChange} />
            </div>
            <div className="head-select">
                <SelectBoxWithImage operations={operations} onChange={onOpChange}/>
            </div>
        </div>            
            <OperationName opNum={operation.head.opName} checked={operation.head.checked} onChange={onChange}/>
            
        
    </div>

    )
}

export default Header;