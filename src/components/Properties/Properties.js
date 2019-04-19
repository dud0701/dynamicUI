import React, { Component } from 'react';
import Advanced from '../Advanced/Advanced';
import ElementContainer from '../../elements/ElementContainer';

class Properties extends Component {
    render() {
        const { parameters, mutually_exclusive_group, options } = this.props;
        return(
            <div>
                <div className="properties">
                <div className="properties-title" onClick={this.handlePanel} >
                    <h1>Properties</h1>
                </div>
               <div className="properties-body">

                {parameters.map(data => (
                    <ElementContainer jsonData={data} key={"a" + data.data.name} isMultiFile={data.isMultiFile}/>
                ))} 

                {
                     mutually_exclusive_group.length ?  
                        mutually_exclusive_group.map(data => (
                            <ElementContainer jsonData={data} key={"m" + data.data.name} isMultiFile={data.isMultiFile}/>
                        ))  : null 
                }
                
                </div>
              
                 <Advanced adData={options} mutData={mutually_exclusive_group}/> 
        </div>
            </div>
        )
    }
}

export default Properties;