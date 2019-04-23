import React, { Component } from "react";
import {Button, Input} from 'reactstrap';
/*  => input component만 렌더링하고 |*|* 문자열을 붙여서 value로 setData*/
class InputList extends Component {

  state = {
    fields : [""]
}

  handlePlusButton = (e)=>{
    e.preventDefault();
    this.setState({
      fields :[...this.state.fields,""]
    });
  }

  handleInpuChange = (index, e) => {
    let fields = [...this.state.fields];
    fields[index] = e.target.value;
    this.setState({
      fields
    })
    //propertycontainer의 이벤트핸들러호출
  }

  handleRemoveInput = (index) => {
    console.log(index);
    let fields = [...this.state.fields];
    fields.splice(index,1);
    this.setState({
      fields
    })
  }
     render()  {
         const { data, onBlur, dataType } = this.props;
         const { handlePlusButton, handleInpuChange, handleRemoveInput } = this;
         const { fields } = this.state;
         const isFormGroupDeletionAllowed = fields.length > 1 ? false : true; 
      //TODO : CSS로 X버튼 input안으로 넣기
        return(
            <div className="input div">
            <div className={"input list " + data.name}>
           {fields.map((value, index)=>(
             <div className="input_group">
                 <Input
                 name={data.name + index}
                 onChange={(e) => handleInpuChange(index, e)}
                 value={value}
                 onBlur={onBlur}
                 /* disabled={dataType === "options" ? true : false} */
                 bsSize="sm"
               />
               {/* TODO : CSS로 X버튼 input안으로 넣기 */}
                <Button 
                  className="remove_button" 
                  onClick={(e)=>handleRemoveInput(index)} 
                  disabled={index === 0 ? isFormGroupDeletionAllowed : undefined} 
                  onBlur={onBlur}>X</Button>
               </div>
               
            )) }
          </div>
           <div className="input button">
                <Button 
                  onClick={handlePlusButton} 
                  onBlur={onBlur} 
                 /*  disabled={dataType === "options" ? true : false} */>+</Button>
          </div> 
          </div>

        )
    } 
}

export default InputList;




