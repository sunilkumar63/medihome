import React from 'react'
import axios from 'axios'
import { Button ,Select, Row, Input , Icon, TextArea,Preloader,MediaBox} from 'react-materialize';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw,convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import withLoader  from '../../components/LoaderHoc'

class Form extends React.Component{
    constructor(props){
        super(props);
        this.submit  = this.submit.bind(this)
        this.delete  = this.delete.bind(this)
        this.ImageFile = React.createRef();
        var item = this.props.location.item;
        if(item)
        var contentState = convertFromRaw(JSON.parse(item.content))
        this.state ={
            item : this.props.location.item,
            editorState: EditorState.createEmpty(),
            contentState,
        }
        document.title = "Edit Page";
    }

    componentDidMount(){
        var item = this.props.location.item;
        if(item) {
            this.setState({editorState :   EditorState.createWithContent(
            convertFromRaw(JSON.parse(item.content))
          ) });
        }
        else{
            let id = this.props.match.params.id;
            fetch(`/api/page/${id}`).then(res => res.json()).then(result =>{
            this.setState({editorState :   EditorState.createWithContent(
                convertFromRaw(JSON.parse(result.content))
              ) , item : result });      
        })
     }
    }
delete = () =>{
    var props =  this.props;
    if(this.state.banner) {
        fetch(`/api/page/${this.state.banner.id}` , {method : "DELETE"})
                .then(result =>{
                    props.history.push({
                        pathname : "/admin/pages",
                        state : "result"
                    })
                    window.Materialize.toast('Page Deleted', 5000) 
        })
 }
}
    submit = (form) =>{
        var props = this.props;
        form.preventDefault();
             var contentData = convertToRaw(this.state.editorState.getCurrentContent())
            //  console.log(JSON.stringify(contentData)); return;
             this.setState({editorState: EditorState.createEmpty()})
            this.setState({loading : true})
            const data= new FormData();
            data.append('name' , form.target.elements.name.value)
            form.target.elements.id &&
            data.append('id' , form.target.elements.id.value)
            data.append('status' , true)
            data.append('content' , JSON.stringify(contentData))
            axios.post('/admin/page/save' , data)
                    .then(function (response) {                           
                        props.history.push({
                            pathname : "/admin/pages",
                            state : response.data
                        })
                    })
                    .catch((error) => {
                            this.setState({loading : false})
                            alert("Something Wrong")
                            console.log("Form save Error : ",error);
                    });
    }
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };
      onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
      };

      convertCommentFromJSONToHTML = (text) => {
           return stateToHTML(convertFromRaw(JSON.parse(text))) 
        }

    render(){
        var {item,editorState} = this.state;
        const style = {  margin : "0 auto"  }
        const formStyle  ={
            "boxShadow" : "2px 2px 2px 4px darkgrey",
            "padding" : "40px",
        }
        return(
            <div className="view content-wrapper">
            <div className="page-head clearfix">
                    <div className="title-wrapper"> 
                    { item ?
                    <h4 className ="page-title">Edit Page # {item.name} </h4> :
                    <h4 className ="page-title">New  Page </h4>
                    }
                    </div>
                    <div className="control-wrapper">
                    <Button waves='default' className="red" onClick={() => this.props.history.goBack()}>Back<Icon left>replay</Icon></Button>
                    { item &&
                    <Button waves='teal' className ="blue" onClick={ this.delete }>Delete<Icon  left>remove</Icon></Button>  
                    }
                </div>
                </div>

                <div className="form-wrapper" style={formStyle}>
                <form onSubmit={this.submit}  ref={this.mainForm} className="form"  autoComplete="off">
                { item &&
                 <Input type="hidden" name="id" value={item.id} ></Input>
                }
                    <Row>
                          <Input name='status' type='switch' value="true" />
                    </Row>
                    <Row>
                        <Input s={6} l={12} label="Name" defaultValue = { item && item.name} name ="name" validate><Icon>account_circle</Icon></Input>
                    </Row>
                    { item &&
                    <Row>
                        <Input s={6} l={12} label="URL Key"  defaultValue = { item && item.url_key} name ="url_key" validate><Icon>account_circle</Icon></Input>
                    </Row>
                    }
                    <Editor
                            editorState={editorState}
                            toolbarClassName="pages-toolbar"
                            wrapperClassName="page-wrapper"
                            editorClassName="page-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            />
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