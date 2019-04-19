import React, { Component } from 'react';
import ElementContainer from '../../elements/ElementContainer';

class Return extends Component {
    state = {
        currentSelected:'String',
    }

    
    tempData = [
        {id: 0, label: "String"},
        {id: 1, label: "CSV"},
        {id: 2, label: "File"},
    ];

    returnDatas = {
        name:"Result type",
        input_type:"InputSelect", 
        label_type:"LabelText", 
        value:"", 
        data : {
            name: "Result Type",
            choices:["String","CSV","File"] 
        }
    };

    
  
    stringProp =  [{ input_type:"DropBoxTable", label_type:"LabelText", 
                    data:{
                        name : "Variable name",
                        data:[ {value:1, IsArray:"false", VariableName:"test", GroupName:"GroupA"},
                            {value:2, IsArray:"true", VariableName:"var", GroupName:"GroupA"},
                            {value:3, IsArray:"false", VariableName:"index", GroupName:"GroupB"},]
                    }   }];
    csvProp =  [{input_type:"InputText", label_type:"LabelText",
                data : {   name:"Group name"}}];
    fileProp = [{ input_type:"InputFile", label_type:"LabelText", value:"", data:{name:"File path",value:""}},
                { input_type:"DropBoxTable", label_type:"LabelText", data:{
                    name:"Variable name",
                    value:"",
                    data:[{}]}}]

    
    handleSelectChange = (e) => {
        this.setState({
            currentSelected: e.target.value
        })
    }


    render() {
        const { returnDatas, handleSelectChange, stringProp, csvProp, fileProp } = this;
        return( 
            <div className="return">
                <div className="return-title" onClick={this.handlePanel}>
                    <h1>Return value</h1>
                </div>
               <div className="return-body">
               
                <ElementContainer jsonData={returnDatas} onChange={handleSelectChange} />
               
                    {
                        this.state.currentSelected === "String" ?
                       
                            stringProp.map(prop => (
                                <ElementContainer jsonData={prop} key={"b" + prop.name} />
                                ))
                            
                         :null
                    }

                    {
                        this.state.currentSelected === "CSV" ?
                        
                            csvProp.map(prop => (
                                <ElementContainer jsonData={prop} key={"b" + prop.name} />
                                ))
                            
                          :null
                    }

                    {
                        this.state.currentSelected === "File" ?
                       
                            fileProp.map(prop => (
                                <ElementContainer jsonData={prop} key={"b" + prop.name} />
                                ))
                         
                          :null
                    }
                </div>


            </div>
               
        )
    }
}

export default Return;