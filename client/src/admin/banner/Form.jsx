import React from 'react'
import axios from 'axios'
import { Button ,Select, Row, Input , Icon, TextArea,Preloader,MediaBox} from 'react-materialize';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.submit  = this.submit.bind(this)
        this.delete  = this.delete.bind(this)
        this.ImageFile = React.createRef();
        this.state ={
            banner : this.props.location.item
        }
        // this.props ?
        // document.title  = { "Edit Banner # "+this.props.location.item.name ; banner : this.props.location.item }
        // :  
        document.title = "Edit Banner"
    }

delete = () =>{
    var props =  this.props;
    if(this.state.banner) {
        fetch(`/api/banner/${this.state.banner.id}` , {method : "DELETE"})
                .then(result =>{
                    props.history.push({
                        pathname : "/admin/banner/grid",
                        state : "result"
                    })
                    window.Materialize.toast('Banner Deleted', 10000) 
        })
 }
}
    submit = (form) =>{
        var props = this.props;
        form.preventDefault();
        if(!form.target.elements.image.files) alert("No file selected") ; 
         else {
            this.setState({loading : true})
            const data= new FormData();
            data.append('name' , form.target.elements.name.value)
            form.target.elements.id &&
            data.append('id' , form.target.elements.id.value)
            data.append('status' , true)
            form.target.elements.image.files[0] &&
            data.append('image' , form.target.elements.image.files[0])
            axios.post('/admin/banner/save' , data)
                    .then(function (response) {                           
                    if(response.statusCode === 500) {
                    }else{
                        props.history.push({
                            pathname : "/admin/banner/grid",
                            state : response.data
                        })
                    }
                })
                .catch((error) => {
                    this.setState({loading : false})
                    alert("Please Upload Image")
                    console.log("form save Error : ",error);
            });
        }
    }

    render(){
        var {banner} = this.state;
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
                    { banner ?
                    <h4 className ="page-title">Edit Banner # {banner.name} </h4> :
                    <h4 className ="page-title">New  Banner </h4>
                    }
                    </div>
                    <div className="control-wrapper">
                    <Button waves='light' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                    { banner &&
                    <Button waves='teal' className ="blue" onClick={ this.delete }>Delete<Icon  left>remove</Icon></Button>  
                    }
                </div>
                </div>

                <div className="form-wrapper" style={formStyle}>
                <form onSubmit={this.submit}  ref={this.mainForm} className="form"  autoComplete="off">
                { banner &&
                 <Input type="hidden" name="id" value={banner.id} ></Input>
                }
                    <Row>
                        <Input s={6} l={12} label="Name" defaultValue = { banner && banner.name} name ="name" validate><Icon>account_circle</Icon></Input>
                    </Row>
                    <Row>
                        <Input l={12} s={6}  type='file' label="Choose file" defaultValue ={banner && banner.filename }  placeholder=""  name="image" ref={this.ImageFile} required= {banner ? "" : "required"} > </Input>
                        { banner &&
                        <MediaBox src={ banner.src} width="150"></MediaBox >
                        }
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