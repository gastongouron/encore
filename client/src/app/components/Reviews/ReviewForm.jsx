import { connect } from 'react-redux'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider';
import ReactS3Uploader from 'react-s3-uploader'
import isImage from 'is-image-filename'
import ReactPlayer from 'react-player'
import LinearProgress from '@material-ui/core/LinearProgress';

class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: parseFloat(this.props.formScore),
      userId: this.props.currentUser.user_id,
      artistId: this.props.artistDetail.artistDetail.artist_id, 
      progress: 0,
      hiddenProgress: true,
    };
  }

  onSlide(e, value) {
    this.setState({rating: value});
    this.props.setScore(value)
  }

  onUploadProgress(context, val){
    this.setState({progress: val})
    this.setState({hiddenProgress: false})
    const { progress } = this.state.progress;
    if (progress === 100) {
      this.setState({hiddenProgress: true})
    } else {
      const diff = Math.random() * 10;
      this.setState({ progress: Math.min(progress + diff, 100) });
    }
  }  

  onUploadError(error){
  }  

  onUploadFinish(context, obj){
    console.log(obj)
    this.setState({path: obj.public})
    this.props.setMedia(obj.public)
  }  

  onClickRemove(){
    this.props.unsetMedia()
    this.setState({progress: 0})
    this.setState({hiddenProgress: true})

  }

  render(){

    const style = {
      marginLeft: 10
    }

    const coverStyle = {
        objectFit: 'cover',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        maxHeight: '300px',
    }

    const imageStyle = {
        objectFit: 'cover',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
    }

    const videoStyle = {
        width: '100%',
        height: 'auto',
    }

    const create = [ <RaisedButton style={style} label={this.props.locales.locales.cancel} default={true} onClick={this.props.onClickClose}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.save} primary={true} keyboardFocused={true} onClick={this.props.onClickSave}/>]
    const update = [ <RaisedButton style={style} label={this.props.locales.locales.update} primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.delete} secondary={true} onClick={this.props.onClickDelete}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.cancel} default={true} onClick={this.props.onClickClose}/>]

    const actions = this.props.isUpdate ? update : create
    const user_id = this.props.currentUser.user_id
    const artist_id = this.props.artistDetail.artistDetail.id


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

          
              <div>
               <LinearProgress hidden={this.state.hiddenProgress} variant="determinate" value={this.state.progress} />
               {isImage(this.props.formMedia) ? <img style={imageStyle} src={this.props.formMedia} /> : <ReactPlayer width='100%' height='auto' url={this.props.formMedia} controls={true} />}
               {
                this.props.formMedia ? 
                  <RaisedButton label={this.props.locales.locales.deleteMedia} secondary={true} onClick={(e) => this.onClickRemove(e, this)} />
                :
                  null
               }

              </div>
        
              <div>
                <RaisedButton
                   containerElement='label'
                   label={this.props.formMedia ? this.props.locales.locales.changeMedia : this.props.locales.locales.addMedia}>

                <ReactS3Uploader
                  style={{display:"none"}}
                  className="btn"
                  htmlFor="flat-button-file"
                  signingUrl={`/s3/sign`}
                  signingUrlMethod="GET"
                  accept="*"
                  s3path={"/user_uploads/" + user_id + "/reviews/" + artist_id}
                  getSignedUrl={this.getSignedUrl}
                  onSignedUrl={this.onSignedUrl}
                  onProgress={(val) => this.onUploadProgress(this, val)}
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
                </RaisedButton>

              </div>

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
              rows={1}
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
