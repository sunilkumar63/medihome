import React from 'react';
import {Alert} from 'react-bootstrap';
class Flash extends React.Component{
    constructor(props){
        super(props)
    this.state ={
        hide : false
    }
}

componentDidMount(){
    setTimeout(function(){
        this.setState({ hide : true })
        }.bind(this) , 5000)
}

    render(){
        // var hideClass = "";
        var hideClass = this.props.show ? "" : "hide";
        return(            
            <div className={"messages "+hideClass }>
                <div className="message">
                    {this.props.message}
                </div>         
            </div>   
        )
    }
}

export default Flash;