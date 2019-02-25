import React from 'react';
import Loader from './Loader';

const LoaderH =  (api_url, prop_name) => (WrappedComponent) => {
    return class LoaderHOC extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                items : []
            }
        }
    componentDidMount(){
        var api = null;
        let param_id =  this.props.match.params.id;
        param_id ? api = api_url+"/"+param_id+"/all"  : api =  api_url
        let page_id = this.props.match.params.page_id;
        page_id ? api = api_url+"/"+page_id  : api =  api_url
        
        fetch(api)
        .then(res => res.json())
        .then(items => this.setState({items }))
        .catch(err => console.error(err))
        console.log(api)
}
      render() {
        return (
        this.state.items.length === 0
          ? <Loader />  :  <WrappedComponent {...this.props}  {...{ [prop_name]: this.state.items}}
           />)
      }
    }
  }

  export default LoaderH