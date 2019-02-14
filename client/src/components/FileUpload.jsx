import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import axios from "axios";
import classNames from 'classnames'
class FileUpload extends Component {
    
  onDrop = (files) => {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('filename', files[0].name);
    axios.post('/uploadsave' , JSON.stringify(data))
                        .then(function (response) {
                            console.log("uploaded "+response)
                          })
                            .catch(function (error) {
                                console.log(error);
                        });
  }

  render() {
    return (
      <div className="uploadBox theme-color">
        {/* <ReactDropzone onDrop={this.onDrop}> */}
        <ReactDropzone onDrop={this.props.file}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?                
                <i className="fa fa-5x fa-upload">DRAG FILE HERE</i> :
                <i className="fa fa-5x fa-upload"></i>
              }
            </div>
          )
        }}
      </ReactDropzone>
      </div>
    );
  }
}

export default FileUpload;