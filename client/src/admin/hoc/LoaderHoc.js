import React from 'react';
import Loader from './Loader';

const withNotify = (WrappedComponent) => {
    return class Notify extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                items : []
            }
        }

    componentDidMount(){  } 
      render() {
        return (
        this.state.items.length === 0
          ? <Loader />  :  <WrappedComponent {...this.props}  {...{ [prop_name]: this.state.items}}
           />)
      }
    }
  }

  export default withNotify