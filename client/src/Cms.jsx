import React from 'react';
//  require('../css/customer.css');
import withLoader  from './components/LoaderHoc'
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import { Breadcrumb} from 'react-bootstrap';

class Cms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { page : null ,page_id : null  }    
        document.title  =  this.props.page.name;
      }

convertContentFromJSONToHTML = (text) => {
    return stateToHTML(convertFromRaw(JSON.parse(text))) 
 }

render() {
    const {page } =  this.props;
    var html = this.convertContentFromJSONToHTML(page.content)
    return (   
        <div className="page">       
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={`/${page.url_key}`}>
                {page.name}
            </Breadcrumb.Item>
        </Breadcrumb>
        <div className="title">{page.name}</div>     
             <div className="content">
                <div dangerouslySetInnerHTML={{__html: html}} />
            </div>
        </div>
    )
}
}
export default withLoader('/api/pages' , 'page')(Cms );