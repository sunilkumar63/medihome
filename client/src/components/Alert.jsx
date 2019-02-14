import React from 'react';
import {Alert , Button} from 'react-bootstrap';
import {render} from 'react-dom'
class AlertDismissable extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleDismiss = this.handleDismiss.bind(this);
      this.handleShow = this.handleShow.bind(this);
  
      this.state = {
        show: true
      };
    }
  
    handleDismiss() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      if (this.state.show) {
        return (
          <Alert bsStyle="success" onDismiss={this.handleDismiss}>
            <h4>Oh snap! Just a confirmation</h4>
            <p>
              Are you sure want to upload and place order ?
            </p>
            <p>
              <Button bsStyle="info" onClick={this.props.confirmed}>Yes</Button>              
              <Button onClick={this.handleDismiss}>No</Button>
            </p>
          </Alert>
        );
      }
      return null;
    }
  }export default AlertDismissable;