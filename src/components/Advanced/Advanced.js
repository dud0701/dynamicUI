import React, { Component } from 'react';
import ElementContainer from '../../elements/ElementContainer';

class Advanced extends Component {
    state={
        open:false
    }

 /*    componentWillMount() {

        const { adData, mutIndex, mutData } = this.props; 

        
        
    } */
    

    handlePanel = () => {
        this.setState({
            open : !this.state.open
        });
    }

    render() {
        const { adData, mutIndex, mutData } = this.props;
        return( 
            <div className="advanced">
                <div className="advanced-title" onClick={this.handlePanel}>
                {this.state.open? "▼" : "▶"} Advanced 
                </div>
               <div className="advanced-body">
                     {this.state.open && 
                         adData.map(data => (
                             data.data.is_visible && !data.isMutData?
                                <ElementContainer jsonData={data} key={"a" + data.data.name} isMultiFile={data.isMultiFile}/> :
                                null
                        ))
                        
                    } 
{/* 
                    {
                        this.state.open && (
                             test = adData.filter((data) => {
                                return mutIndex.includes(data.name);
                            }),

                            test.map(data=> (
                                
                                <PropertyContainer jsonData={data} key={"a" + data.data.name}/> 
                               
                            ))
                        )
                    }  */} 
                </div>
        </div>
        )
    }
}

export default Advanced;