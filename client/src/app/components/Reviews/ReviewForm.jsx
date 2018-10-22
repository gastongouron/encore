import { connect } from 'react-redux'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider';
import ReactS3Uploader from 'react-s3-uploader'
// import PresignedUrl from '../../queries/s3Signature'


class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: parseFloat(this.props.formScore),
      filename: ''
    };
    console.log('-------------------')
    console.log(props)

  }

  onSlide(e, value) {
    this.setState({rating: value});
    this.props.setScore(value)
  }

  // getSignedUrl(value){
  //   console.log('in getSignedUrl')
  //   console.log(value)
  //   this.props.onSign(value)

    // this.props.client.query({query: PresignedUrl, variables: {filename: "lol.jpg"}}).then(
    //   (res) => {
    //       console.log(res)
    //       // const updatedArr = res.data.editReview.review
    //       // context.props.updateUserReview(updatedArr)
    //       // context.setState({showModal:false})
    //   },
    //   (err) => {
    //     console.log(err)
    //     // console.log('HANDLE ERROR!!!')
    //   })

  // }

  // onUploadStart(value) {
  //   console.log('STARTING UPLOAD')
  //   console.log(value.name)
  //   // this.setState({filename: value.name})
  //   this.getSignedUrl(value.name)
  // }


  // onSignedUrl(){
  //   console.log('in onSignedUrl empty func')
  // }

  // onUploadProgress(){
  //   console.log('in onUploadProgress')
  // }  

  // onUploadError(){
  //   console.log('in onUploadError')
  // }  

  // onUploadFinish(){
  //   console.log('in onUploadFinish')
  // }  
  getSignedUrl(file, callback) {
    console.log('WTF AM I DOING HERE?')
    console.log(file)
    console.log(callback)
    // const params = {
    //   contentType: file.type || 'application/octet-stream'
    // };
    // api.get('/s3/sign', { params })
    //   .then(response => {
    //     callback(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  render(){

    const style = {
      marginLeft: 10
    }

    const create = [ <RaisedButton style={style} label={this.props.locales.locales.cancel} default={true} onClick={this.props.onClickClose}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.save} primary={true} keyboardFocused={true} onClick={this.props.onClickSave}/>]
    const update = [ <RaisedButton style={style} label={this.props.locales.locales.update} primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.delete} secondary={true} onClick={this.props.onClickDelete}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.cancel} default={true} onClick={this.props.onClickClose}/>]

    const actions = this.props.isUpdate ? update : create

    return (
           <Dialog
            open={this.props.onShow}
            title={
              <h1>Write something nice!</h1>
            }
            modal={false}
            actions={actions}
            autoScrollBodyContent={true}
          >

         <ReactS3Uploader
            signingUrl={`/s3/presigned_url`}
            signingUrlMethod="GET"
            accept="image/*"
            s3path="/uploads/"
            // getSignedUrl={this.getSignedUrl}
            preprocess={this.onUploadStart}
            onSignedUrl={this.onSignedUrl}
            onProgress={this.onUploadProgress}
            onError={this.onUploadError}
            onFinish={this.onUploadFinish}
            signingUrlHeaders={ this.headers }
            // signingUrlQueryParams={{ additional: query-params }}
            signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
            contentDisposition="auto"
            scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
            // server="http://localhost:3001"
            // inputRef={cmp => this.uploadInput = cmp}
            autoUpload={true}
            /> 

            {/*<ReactS3Uploader
              signingUrl={`${process.env.HOST}/things/presigned_url`}
              signingUrlMethod="GET"
              signingUrlHeaders={this.headers}
              signingUrlWithCredentials={true}
              uploadRequestHeaders={{ 'acl': 'public-read' }}
              contentDisposition="auto"
              preprocess={addFileToBookingObject}
            />; */}

            <Slider 
              step={1} 
              value={parseFloat(this.props.formScore)}
              min={0}
              max={5}
              onChange={this.onSlide.bind(this)}
              required={true}
              />
              
            <TextField
              floatingLabelText="Review body"
              hintText="Something meaningful you'd like to share with the world"
              id="body"
              type="text"
              label="Review"
              multiLine={true}
              rows={3}
              value={this.props.formValue}
              onChange={this.props.setBody}      
              fullWidth={true}       
            />
            <br />

          </Dialog>
     )

  }

}


const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(CustomForm);
