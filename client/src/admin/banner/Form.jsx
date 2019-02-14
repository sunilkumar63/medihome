import React from 'react'
import axios from 'axios'
import { Button ,Select, Row, Input , Icon, TextArea,Preloader,Col} from 'react-materialize';

class Form extends React.Component{
    constructor(){
        super();
        this.submit  = this.submit.bind(this)
        this.ImageFile = React.createRef();
    }
componentDidMount(){
    document.title  = "New Banner"
}
    submit = (form) =>{
        var props = this.props;
        form.preventDefault();
        if(!form.target.elements.image.files) alert("No file selected") ; 
         else {
            this.setState({loading : true})
            const data= new FormData();
            data.append('name' , form.target.elements.name.value)
            data.append('image' , form.target.elements.image.files[0])
            axios.post('/admin/banner/save' , data)
                    .then(function (response) {                           
                    if(response.statusCode === 500) {
                                                    
                    }else{
                        props.history.push({
                            pathname : "/admin/banner/grid",
                            state : response.data
                        })
                        window.Materialize.toast('Banner Saved', 10000) 
                    }
                })
                .catch((error) => {
                    this.setState({loading : false})
                    alert("Please Upload Image")
                    // window.Materialize.toast('Something Missing', 10000) 
                    console.log("form save Error : ",error);
            });
        }
    }

    render(){
        const style = {
            margin : "0 auto"
        }
        const formStyle  ={
            "boxShadow" : "2px 2px 2px 4px darkgrey",
            "padding" : "40px",
        }
        return(
            <div className="view content-wrapper">
            <div className="page-head clearfix">
                    <div className="title-wrapper">
                    <h4 className ="page-title">New Banner</h4>
                    </div>
                    <div className="control-wrapper">
                    <Button waves='light' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                    {/* <Button waves='teal' className ="blue" onClick={ () =>this.refs.mainForm.onSubmit() }>Save<Icon  left>save</Icon></Button>   */}
                </div>
                </div>

                <div className="form-wrapper" style={formStyle}>
                <form onSubmit={this.submit}  ref={this.mainForm} className="form"  autoComplete="off">
                    <Row>
                        <Input s={6} l={12} label="Name" name ="name" validate><Icon>account_circle</Icon></Input>
                    </Row>
                    <Row>
                        <Input l={12} s={6}  type='file' label="Choose file" placeholder="" name="image" ref={this.ImageFile} required > </Input>
                    </Row>
                    <Row>
                        <Button waves='teal' className ="blue" type="submit">Save<Icon  left>save</Icon></Button>
                    </Row>
                    </form>
                </div>
            </div>
        )
    }


}
export default Form