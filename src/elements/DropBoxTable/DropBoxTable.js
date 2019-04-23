/* TODO : 수정 가능하게 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './DropBoxTable.css';
import { Button, Input } from 'reactstrap';
import Popup from '../Popup/Popup';

class DropBoxTable extends Component {

    state = {
        isOpen: false,
        haveText: "",
        showWindowPortal:false
      
    }

    componentDidMount() {
        window.addEventListener('beforeunload', () => {
          this.closeWindowPortal();
        });
      }

      toggleWindowPortal = () => {
        this.setState(state => ({
          ...state,
          showWindowPortal: !state.showWindowPortal,
        }));
      }

      closeWindowPortal = () => {
        this.setState({ showWindowPortal: false })
      }
      




    handleClick = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      handleText = (name,grp) => {
        let variableName = "{{" + grp + "." + name + "}}";
        this.setState({ 
          haveText: variableName
        })
      }

      itemList = props => {
        const list = props.map((item) => (
          <div
            onClick={(e) => this.handleText(item.VariableName, item.GroupName)}
            className="dropdown_item dd_row"
            key={item.VariableName}>
                <div className="IsArray left">
                    {item.IsArray}
                </div>
                <div className="VariableName middle">
                    {item.VariableName}
                </div>
                <div className="GroupName right">
                    {item.GroupName}
                </div>
            </div>
        ));
    
        return (
        <div className="dropdown_items">
            <div className="dd_container">
            <div className="head dd_row">
                <div className="left">
                    IsArray
                </div>
                <div className="middle">
                    VariableName
                </div>
                <div className="right">
                    GroupName
                </div>

            </div>
                { list } 
            </div>
         </div>
        )
      }
  


    render() {
        const { isOpen, haveText, showWindowPortal } = this.state;
        const { handleClick,itemList, closeWindowPortal, toggleWindowPortal } = this;
        const { data, onBlur } = this.props;

        return (
            <div className="input dropdwon">
            <div
            className={isOpen ? "dropdown active input" : "dropdown input"}
            onClick={handleClick} >
            <div className="dropdown_text">
              <Input value={!haveText ? "" : haveText}/>
            </div>
            {itemList(data.data)}
          </div>
          {/* popoup */}
            <div className="input">
                <Button onClick={toggleWindowPortal} onBlur={onBlur}>?</Button>
                {/* TODO : modal 화면에 표시할 데이터 */}
                {showWindowPortal && (
                              <Popup closeWindowPortal={closeWindowPortal}>
                                <h1>What is the Array?</h1>
                                <p>body</p>
                            </Popup>
                )}
            </div>
            

  
        </div>
        )
    }
}



export default DropBoxTable;