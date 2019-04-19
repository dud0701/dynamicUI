import React, { Component }from 'react';
import ReactDOM from 'react-dom';


class Popup extends Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div'); // STEP 1: create an empty div
        this.externalWindow = null;
    }

    componentDidMount() {
        let width = 600;
        let height = 400;
        let left = window.top.outerWidth / 2 + window.top.screenX - (width / 2);
        let top = window.top.outerHeight / 2 + window.top.screenY - ( height / 2);
        this.externalWindow = window.open('', '', 'width='+width+',height='+height+',left='+left+',top='+top);
        this.externalWindow.document.body.appendChild(this.containerEl);
        
        this.externalWindow.document.title = 'A React portal window';
        
         this.externalWindow.addEventListener('beforeunload', () => {
          this.props.closeWindowPortal();
        }); 
      }

      componentWillUnmount() {
        this.externalWindow.close();
      }

      render() {
          return ReactDOM.createPortal(this.props.children, this.containerEl);
      }
}
export default Popup;