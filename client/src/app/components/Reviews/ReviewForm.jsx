import { connect } from 'react-redux'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider';
import ReactS3Uploader from 'react-s3-uploader'


class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: parseFloat(this.props.formScore),
      userId: this.props.currentUser.user_id,
      artistId: this.props.artistDetail.artistDetail.artist_id, 
      filename: null,
      path: null
    };
    // this.getSignedUrl.bind(this)
  }

  onSlide(e, value) {
    this.setState({rating: value});
    this.props.setScore(value)
  }

  // getSignedUrl(response) {
  //   let url = "https://encore88.s3.amazonaws.com" + this.s3path + "/" + response.name
  //   console.log(this.setState({path: url}))
  // }

  // onSignedUrl(context, obj){
    // console.log(obj.public)
    // this.setState({path: obj.public})
    // console.log('---------------')
    // console.log(context.props)
    // console.log('in onSignedUrl empty func')
  // }

  onUploadProgress(){
    console.log('in onUploadProgress')
  }  

  onUploadError(error){
    console.log(error)
    console.log('in onUploadError')
  }  

  onUploadFinish(context, obj){
    console.log(obj.public)
    this.setState({path: obj.public})
    this.props.setMedia(obj.public)
    console.log('---------------')
    console.log(context.props)
    console.log('in onSignedUrl empty func')
  }  

  onClickRemove(){
    this.setState({path: null})
    this.setState({filename: null})
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
    const user_id = this.props.currentUser.user_id
    const artist_id = this.props.artistDetail.artistDetail.id
    const imgAction = this.state 


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

            <br />
            <span>Photo / Video</span>
            <br />
            <img src={this.state.path}/>

            {
              this.state.path != null
            ? 
              <RaisedButton onClick={this.onClickRemove}>
                Haha
              </RaisedButton>
            : 
             
              <ReactS3Uploader
                signingUrl={`/s3/sign`}
                signingUrlMethod="GET"
                accept="*"
                s3path={"/user_uploads/" + user_id + "/reviews/" + artist_id}
                getSignedUrl={this.getSignedUrl}
                onSignedUrl={this.onSignedUrl}
                onProgress={this.onUploadProgress}
                onError={this.onUploadError}
                onFinish={(obj) => this.onUploadFinish(this, obj)}
                signingUrlHeaders={ this.headers }
                signingUrlQueryParams={{ user_id: user_id, artist_id: artist_id }}
                signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                contentDisposition="auto"
                scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                inputRef={cmp => this.uploadInput = cmp}
                autoUpload={true}
                /> 

            } 

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
        artistDetail: state.artistDetail,
        currentUser: state.currentUser,
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(CustomForm);
