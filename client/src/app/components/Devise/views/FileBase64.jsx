import React from 'react';
import ImageTools from './Imagetools'
import $ from 'jquery'
export default class FileBase64 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
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

          // if(allFiles.length == files.length){

            console.log('in allfiles callback')
            console.log(allFiles[0])

            // if(this.props.multiple) this.props.onDone(allFiles); else
          this.props.onDone(allFiles[0]);
          // }

        }
      }
      this.resize(file,callback)
    }
  }

  render() {
    return (
      <input
        type="file"
        onChange={ this.handleChange.bind(this) }
        multiple={ this.props.multiple } />
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
};