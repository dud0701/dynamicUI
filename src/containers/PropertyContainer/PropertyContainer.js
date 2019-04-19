import React, { Component } from 'react';
import { Header, Properties, Return } from '../../components';
import TempData from '../data';

class PropertyContainer extends Component {

    state = {
        curOpSelected : "Rossum",
        opRealData : TempData[0]["argoslabs.data.rdb"],
    }

    opType = [
        {id: 0, label: "Action", value: "Action", name:"Action"},
        {id: 1, label: "Verification", value: "Verification", name:"Verification"},
        {id: 2, label: "System Calls", value: "System Calls", name:"System Calls"},
        {id: 3, label: "Interactives", value: "Interactives", name:"Interactives"},
        {id: 4, label: "Plugins", value: "Plugins", name:"Plugins"},
      ]

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

      operation = {
        head: {
          opName : "Operation 3",
          checked : true
        }
      }

      //render 후에 실행된다.
      componentWillMount() {
        this.afterClick();
        
      }

      //select click  한후  데이터가 바뀔 때
      //mutually_exclusive_group가 있는지 체크하고
      //json데이터에 맞게 화면이 그려지게끔 json 다시 구성
      afterClick = () => {
        let { opRealData } = this.state;
        let indexArr = [];
        let mutuallyGroup = opRealData.mutually_exclusive_group;
        let advanRealData = opRealData.options;
        let propRealData = opRealData.parameters;
        let mutData = [];
        let mutIndex = [];
    
        //mutually_exclusive_group가 존재하는지와  required가 true일 경우 존재여부 확인 후
        if(mutuallyGroup.length > 0 && mutuallyGroup[0].required === true) {
          //option데이터에서 mutually_exclusive에 있는 name존재하는지 확인 후 해당 객체 데이터들을 mutData에 저장
            advanRealData.forEach((obj, i)=> {
            mutuallyGroup[0].options.forEach((name)=> {
              if(obj.name === name){
                indexArr.push(i);
                mutData.push(obj);
              }
            });
          });       
          
        /*   var mutData = advanRealData.filter((data, i) => {
            return mutuallyGroup[0].options.includes(data.name);
          }) */
    
        }    
           this.setState({
          mutData : mutData,
        }); 

         //json데이터에 맞게 화면이 그려지게끔 json 다시 구성
         //TODO : 하나로 할 수 있도로 고치자
        this.handleJson(propRealData, indexArr, "parameters");
        this.handleJson(advanRealData,indexArr,"options");
        this.handleJson(mutData,mutIndex,"mutually_exclusive_group");

      }

      //head의 operation select 이벤트
    handleOpSelectChange = e => {
        let dataArr = ["argoslabs.api.rossum","argoslabs.data.rdb","argoslabs.api.rest","argoslabs.data.excel","argoslabs.data.json","argoslabs.filesystem.monitor","argoslabs.filesystem.op","argoslabs.ai.tts" ]
        let test = TempData[0][dataArr[e.id]];
        this.setState({
        curOpSelected: e.value,
        opRealData :test
        });
        this.afterClick();
    }



    //실제 json데이터를 체크해서 input, label type지정해서 json 다시 만들기?
    handleJson = (jsonData, mutIndex, flag) => {
         let temp = [];
         let labelEx = [{parameters:"LabelText", options:"LabelCheck", mutually_exclusive_group:"LabelRadio"}];
     
         jsonData.forEach(function(obj, index){
             //option(advanced)인 경우 label은 checkbox, prameter일 경우 label은 text, mutually~일 경우 label=radio
             let inputType = "";
             let labelType=labelEx[0][flag]; //labe_type 처리 => mutually option 둘 중 하나만 선택(radio)
             let isMutData =false;
             let isMultiFile = false;
         
          
             //type, choices처리 -> input_type

             //inputdl 없는 경우 처리
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
                      //TODO : Multi File 구현하기 (file에 같이 구현할지? 아니면 따로 컴포넌트 만들지 ?)
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
                   if(mutIndex[i] == index) {
                       isMutData = true;
                   }
               }
 
            }
 
            temp.push({input_type: inputType, label_type: labelType, data: obj, isMutData: isMutData, isMultiFile: isMultiFile});            
         })
         
         this.setState ({
             [flag] : temp
         })
     }

      
  //TODO : input 이벤트 
  //TODO : check box 이벤트 
  //TODO : select 이벤트
  //TODO : dropdown 이벤트
  //TODO : file 이벤트
  //TODO : radio 이벤트
  //TODO : 멀티 input 이벤트 -> setstate과정을 여기서해
     

    render () {

        const { opType, handleOpSelectChange, operations, operation } = this;
        const { mutually_exclusive_group,  options, parameters } = this.state;
        return (
            <div className="start">
                <Header opType={opType} onOpChange={handleOpSelectChange} operations={operations} operation={operation}/>
                <Properties parameters={parameters} mutually_exclusive_group={mutually_exclusive_group} options={options}/>
                <Return/>
            </div>

        )
    }

}

export default PropertyContainer;