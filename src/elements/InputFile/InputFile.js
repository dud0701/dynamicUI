/* File */
//TODO :파일리스트 계속 쌓기?
import React, { Component } from "react";
import { Input } from "reactstrap";
import './InputFile.css';

/* const InputFile = ({ value, name, disabled, onChange }) => {
  return (
    <div className={"input file " + name}>
      <Input
        type="file"
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}; */

class InputFile extends Component {
  state = {
    fileName: "파일명을 입력하세요.",
    fileNames : [] 
  }

  handleFileName = (e) => {
    //console.log(e.target.files[0]);
    //console.log(e.target.files[1]);
   // console.log(e.target.files[2]);
    const { isMultiFile } = this.props;

    if(isMultiFile) {
      let files = e.target.files;
      let fileNames = [];
      
    
      for(let i=0;i<files.length;i++) {
        fileNames.push(files[i].name);
      /*   this.setState({
          fileNames : [...this.state.fileNames, files[i].name]
        }) */
      } 
      /*  this.setState({
        fileNames : [...this.state.fileNames, fileNames]
      })  */
      
      this.setState({
        fileNames
      })
    }
    //single file일 경우
    else {
      this.setState({
        fileName: e.target.files[0].name
      })
    }
  } 

  handleFileList = () => {

  }
  render() {
    const { fileName, fileNames } = this.state;
    const { handleFileName } = this; 
    const { data, isMultiFile, onBlur, dataType } = this.props;
 
    return(
      <div className={"input file " + data.name}>
      <div className="a">
        {fileNames.length > 0 ? 
            fileNames.map((file)=>(
              <Input 
                type="text" 
                id="fileName" 
                bsSize="sm" 
                className="file_input_textbox" 
                value={file} 
                onBlur={onBlur} 
                /* disabled={dataType === "options" ? true : false} *//> 
            )) 
            : <Input 
                type="text" 
                id="fileName" 
                bsSize="sm" 
                className="file_input_textbox" 
                value={fileName} 
                onBlur={onBlur} 
               /*  disabled={dataType === "options" ? true : false} *//>   
        }
      {/*   <Input type="text" id="fileName" bsSize="sm" className="file_input_textbox" value={fileName}/>     */} 
        </div>
        <div className="file_input_div">
       
      <Input 
        type="button" 
        value="..." 
        className="file_input_button" 
        onBlur={onBlur} 
       /*  disabled={dataType === "options" ? true : false} *//>     
      <Input 
        type="file" 
        className="file_input_hidden" 
        id="text1" 
        onChange={(e) => handleFileName(e)} 
        bsSize="sm" 
        multiple={isMultiFile} 
        onBlur={onBlur} 
        /* disabled={dataType === "options" ? true : false} *//>
    </div> 
      </div>
      
    )
  }
}


export default InputFile;
