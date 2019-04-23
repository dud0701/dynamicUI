/* 한줄 */
import React, { Component } from "react";
import * as Elem from "./index";

 class ElementContainer extends Component {
   state = {
      isDisable : false
   }

   handleDisable = () => {
     console.log("disabled");
     this.setState({
       isDisable : !this.state.isDisable
     })
   }

  render () {
    const { jsonData, onChange, onBlur, onTextInput,idx }  = this.props;
    let { input_type, label_type, ...others } = jsonData;
    let label, input = "";
    let { handleDisable } = this;

       //label
  if (Elem[label_type]) {
    let comp = Elem[label_type];
    let pros = { onBlur,onChange, handleDisable, ...others };
    label = React.createElement(comp, { ...pros });
  }

  //input 없는 경우도 있다. 
  //=> action이 store_true일경우 input 값 없음
  //input
   if (Elem[input_type]) {
    let comp = Elem[input_type];
    let pros = { onChange, onBlur, onTextInput, idx, ...others };
    input = React.createElement(comp, { ...pros });
  }
  
    return (
      <div className="form-group">
      {label}
      {input}
    </div>
    )
  }

  

} 




export default ElementContainer;
