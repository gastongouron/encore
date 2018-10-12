import React from 'react';
import ImageTools from './Imagetools'
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    width: 250,
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class FileBase64 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      message: 'Avatar',
      disabled: false
    }
  }

  resize(image, callback){
    ImageTools.resize(image, {
      width: 320, // maximum width
      height: 240 // maximum height
    }, function(blob, didItResize) {
      var newfile = new File([blob], 'temp', {type: blob.type, lastModified: Date.now()});
      callback(newfile)
    });
  }

  handleChange(e) {
    let files = e.target.files;
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      console.log($('#uploader'))

      // show file name
      let callback = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {

          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + ' kB',
            base64: reader.result,
            file: file,
          };

          allFiles.push(fileInfo);
          this.setState({message: 'Thank you'})
          this.setState({disabled: true})
          this.props.onDone(allFiles[0]);
        }
      }
      this.resize(file,callback)
    }
  }


  render() {
    return (
    <RaisedButton
      default={true}
      disabled={this.state.disabled}
      id="uploader"
      label={this.state.message}
      labelPosition="before"
      style={styles.uploadButton}
      containerElement="label"
    >
      <input
        style={styles.uploadInput}
        disabled={this.state.disabled}
        type="file"
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple } />
    </RaisedButton>


    );
  }

}

FileBase64.defaultProps = {
  multiple: false,
};