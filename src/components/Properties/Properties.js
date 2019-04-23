import React, { Component } from 'react';
import Advanced from '../Advanced/Advanced';
import ElementContainer from '../../elements/ElementContainer';

class Properties extends Component {
    render() {
        const { 
            parameters, 
            mutually_exclusive_group, 
            options, 
            onBlur, 
            onTextInput,
            mutIndex } = this.props;
        return(
            <div>
                <div className="properties">
                <div className="properties-title" onClick={this.handlePanel} >
                    <h1>Properties</h1>
                </div>
               <div className="properties-body">

                {parameters.map((data,idx) => (
                    <ElementContainer 
                        jsonData={data} 
                        key={"a" + data.data.name} 
                        onBlur={onBlur} 
                        isMultiFile={data.isMultiFile} 
                        onTextInput={onTextInput}
                        idx={idx}/>
                ))} 

                {
                     mutually_exclusive_group.length ?  
                        mutually_exclusive_group.map((data,idx) => ( 
                            <ElementContainer 
                                jsonData={data} 
                                key={"m" + data.data.name} 
                                isMultiFile={data.isMultiFile}  
                                onBlur={onBlur}
                                onTextInput={onTextInput}
                                idx={mutIndex[idx]}/>
                        ))  : null 
                }
                
                </div>
              
                 <Advanced 
                    adData={options} 
                    mutData={mutually_exclusive_group} 
                    onBlur={onBlur} 
                    onTextInput={onTextInput}/> 
        </div>
            </div>
        )
    }
}

export default Properties;