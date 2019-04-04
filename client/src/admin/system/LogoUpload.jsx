import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import axios from "axios";
import classNames from 'classnames'
class FileUpload extends Component {
  render() {
    return (
      <div className="uploadBox theme-color">
        <ReactDropzone onDrop={this.props.file}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()}  name="logo" />
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