/* TODO : 왜 curData만 바뀌어야하는데 opReadlData까지 저절로 변경이되는거지? */
/* TODO : operationName 은 어떻게 넘겨주는지? */
import React, { Component } from 'react';
import { Header, Properties, Return } from '../../components';
import TempData from '../data';

class PropertyContainer extends Component {

    state = {
        curOpSelected : "",
        opRealData : [TempData[0]["argoslabs.api.rossum"],TempData[0]["argoslabs.data.rdb"],TempData[0]["argoslabs.api.rest"],
                    TempData[0]["argoslabs.data.excel"],TempData[0]["argoslabs.data.json"],TempData[0]["argoslabs.ai.tts"],
                    TempData[0]["argoslabs.filesystem.op"],TempData[0]["argoslabs.filesystem.monitor"]],
        curData : ""
        
    }

    /* TODO : jsonData 어떻게 ? */
    opType = [
        {id: 0, label: "Action", value: "Action", name:"Action"},
        {id: 1, label: "Verification", value: "Verification", name:"Verification"},
        {id: 2, label: "System Calls", value: "System Calls", name:"System Calls"},
        {id: 3, label: "Interactives", value: "Interactives", name:"Interactives"},
        {id: 4, label: "Plugins", value: "Plugins", name:"Plugins"},
      ]

       /* TODO : jsonData 어떻게 ? */
      operations = [
        {id: 0, name:"Rossum", value:"Rossum", imagePath:'', label:"Rossum"},
        {id: 1, name:"SQL", value:"SQL", imagePath:"", label:"SQL"},
        {id: 2, name:"REST API", value:"REST API", imagePath:"",label:"REST API"},
        {id: 3, name:"Excel Advanced", value:"Excel Advanced", imagePath:"",label:"Excel Advanced"},
        {id: 4, name:"JSON Select", value:"JSON Select", imagePath:"",label:"JSON Select"},
        {id: 5, name:"Text to Speech", value:"Text to Speech", imagePath:"",label:"Text to Speech"},
        {id: 6, name:"File/Folder Op", value:"File/Folder Op", imagePath:"",label:"File/Folder Op"},
        {id: 7, name:"File Monitor", value:"File Monitor", imagePath:"",label:"File Monitor"},
      
      ]
       /* TODO : jsonData 어떻게 ? */
      operation = {
        head: {
          opName : "Operation 3",
          checked : true
        }
      }

/*       
        componentWillMount() {        
        if(this.state.curData){
          this.afterClick();
        }
        
      }   
       //render 후에 실행된다.
        componentDidMount() {
        if(this.state.curData){
          this.afterClick();
        }
        
      }   */


      
      //select click  한후  데이터가 바뀔 때
      //mutually_exclusive_group가 있는지 체크하고
      //json데이터에 맞게 화면이 그려지게끔 json 다시 구성
      afterClick = (curData) => {
        //console.log(curData);
        //console.log(this.state);
        let mutuallyGroup = curData.mutually_exclusive_group;
        let advanRealData = curData.options;
        let propRealData = curData.parameters;
        let mutData = [];
        let mutIndex = [];
      
        //mutually_exclusive_group가 존재하는지와  required가 true일 경우 존재여부 확인 후
        if(mutuallyGroup.length > 0 && mutuallyGroup[0].required === true) {
          //option데이터에서 mutually_exclusive에 있는 name존재하는지 확인 후 해당 객체 데이터들을 mutData에 저장
            advanRealData.forEach((obj, i)=> {
            mutuallyGroup[0].options.forEach((name)=> {
              if(obj.name === name){
                mutIndex.push(i);
                mutData.push(obj);
              }
            });
          });       
          
        /*   var mutData = advanRealData.filter((data, i) => {
            return mutuallyGroup[0].options.includes(data.name);
          }) */
    
        }    
        this.setState({
          mutData,
          mutIndex 
        }); 

         //json데이터에 맞게 화면이 그려지게끔 json 다시 구성
         //TODO : 하나로 할 수 있도로 고쳐?
        this.handleJson(propRealData, mutIndex, "parameters");
        this.handleJson(advanRealData,mutIndex,"options");
        this.handleJson(mutData,mutIndex,"mutually_exclusive_group");

      }

      //head의 operation select 이벤트
    handleOpSelectChange = e => {
        //let dataArr = ["argoslabs.api.rossum","argoslabs.data.rdb","argoslabs.api.rest","argoslabs.data.excel","argoslabs.data.json","argoslabs.filesystem.monitor","argoslabs.filesystem.op","argoslabs.ai.tts" ]
        let selectId = e.id; //selected id
        let curData = this.state.opRealData[selectId]; //셀렉트된 데이터들을 curData로 담아준다.
        //let opRealDataCopy = Object.assign({}, this.state.opRealData); //state의 opRealData 복사
       // opRealDataCopy[selectId] = this.state.curData; //이전의 curData를 opRealData에 넣는다.

        this.setState({
        curOpSelected: e.value,
        curData :curData,
        /* opRealData : opRealDataCopy */
        });
        this.afterClick(curData);
    }


    //실제 json데이터를 체크해서 input, label type지정해서 json 다시 만들기?
    handleJson = (jsonData, mutIndex, flag) => {
         let temp = [];
         let labelEx = [{parameters:"LabelText", options:"LabelCheck", mutually_exclusive_group:"LabelRadio"}];
     
         jsonData.forEach(function(obj, index){
             //option(advanced)인 경우 label은 checkbox, prameter일 경우 label은 text, mutually~일 경우 label=radio
             let inputType = "";
             let labelType=labelEx[0][flag]; //label m, _type 처리 => mutually option 둘 중 하나만 선택(radio)
             let isMutData =false;
             let isMultiFile = false;
             let mutIdx = "";
             let isDisabled = false;
         
             //input이 없는 경우 처리
             if(obj.type === "bool" || obj.type === "str2bool") {
               // console.log("none");
                 inputType = "none";
             }
 
 
            //obj.type="str" 인 경우 textbox, selectbox, file(input_method="fileread") 구분 
            if(obj.type === "str") {
                  //input이 list인 경우
                  if(obj.input_method !== "fileread" && (obj.action === "append"|| obj.nargs === "+" || obj.nargs === "*")) {
                      inputType = "InputList";
                  }
                  //input이 select인 경우
                  else if(obj.choices) {
                      inputType = "InputSelect";
                  }
                  //input이 file인 경우
                  else if(obj.input_method === "fileread") {
                      isMultiFile = obj.action === "append" ? true : false; //input이 file인지 multi file인지 구분
                      inputType = "InputFile";
                  }
                  //input이 없을 경우
                  else if(obj.action === "storetrue" ){ 
                      inputType = "none";
                  }
                  //input이 text인 경우
                  else {
                      inputType = "InputText";
                  }    
               
            }

            //input이 number일 경우
            if(obj.type === "int" || obj.type === "float") {
              inputType = "InputNumber";
          }
 
            //advanced data에 mutually Data인것을 표기
            if(flag === "options") {
               for(let i=0;i<mutIndex.length; i++) {
                   if(mutIndex[i] === index) {
                       isMutData = true;
                       mutIdx = mutIndex[i];
                       isDisabled = true;
                       
                   }
               } 
            }
 
            temp.push({input_type: inputType, 
                        label_type: labelType, 
                        data: obj, 
                        isMutData: isMutData, 
                        isMultiFile: isMultiFile, 
                        dataType:flag, 
                        mutIdx : mutIdx,
                        isDisabled : isDisabled});            
         })
         
         this.setState ({
             [flag] : temp
         })
     }

      
  //TODO : inputbox(text) 이벤트
  //option의 text input change 이벤트
  handleOptionsTextInput = (e,name, i) => {
  
    
  }
  //text input change 이벤트, select도 
  handleTextInput = (e,i,dataType) => {
    //e.persist();
    let stateDataCopy = Object.assign({}, this.state.curData);
    console.log(i);

    if(dataType === "parameters") {
      stateDataCopy.parameters[i].value = e.target.value;
    }

    if(dataType === "options") {
      stateDataCopy.options[i].value = e.target.value;
    }

    if(dataType === "mutually_exclusive_group") {
      stateDataCopy.options[i].value = e.target.value;
    } 

    //return 일 경우 처리
    
    this.setState({
      curData : stateDataCopy
    })     
  }

  //checkbox change 이벤트
  handleCheckbox = (e,i,dataType) => {
    
  }



  //TODO : inputbox List(text) 
  //TODO : check box 이벤트 
  //TODO : select 이벤트
  //TODO : dropdown 이벤트
  //TODO : file 이벤트
  //TODO : radio 이벤트
  //TODO : 멀티 input 이벤트 -> setstate과정을 여기서해

  handleBlur = (e) => {
    //console.log(this.state);
   // console.log("a");
   /*  var currTarget = e.currentTarget;
    setTimeout(function() {
      if (!currTarget.contains(document.activeElement)) {
          console.log('component officially blurred');
      }
    }, 0); */
}
     

    render () {

        const { 
          opType, 
          handleOpSelectChange, 
          operations, 
          operation, 
          handleBlur, 
          handleTextInput, 
          handleCheckbox} = this;
        const { 
          mutually_exclusive_group,  
          options, 
          parameters, 
          mutIndex } = this.state;  
        return (
            <div className="start">
                <Header 
                  opType={opType} 
                  onOpChange={handleOpSelectChange} 
                  operations={operations} 
                  operation={operation}/>
                {parameters  
                ? <Properties 
                  parameters={parameters} 
                  mutually_exclusive_group={mutually_exclusive_group} 
                  options={options} 
                  onBlur={handleBlur}
                  onTextInput ={handleTextInput}
                  onCheckbox = {handleCheckbox}
                  mutIndex={mutIndex}/>
                :null}
                {/*TODO :  jsonData어떤식으로  return? */}
                <Return onBlur={handleBlur}/>
                {/* <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state.opRealData[1].parameters, null, '\t')}</pre> */}
            </div>

        )
    }

}

export default PropertyContainer;