import { connect } from 'react-redux'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider';
import ReactS3Uploader from 'react-s3-uploader'
import isImage from 'is-image-filename'
import ReactPlayer from 'react-player'
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '../../../shared/Alert'
import strings from '../../../app/locales/strings'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

const customContentStyle = {
  width: '100%',
  maxWidth: '460px',
};

class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: parseFloat(this.props.formScore),
      userId: this.props.currentUser.user_id,
      artistId: this.props.artistDetail.artistDetail.artist_id, 
      progress: 0,
      hiddenProgress: true,
      error: '',
      hiddenError: true,
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

  onUploadError(context, error){
    this.setState({hiddenProgress: true})
  }  

  onUploadFinish(context, obj){
    this.setState({path: obj.public})
    this.props.setMedia(obj.public)
    this.setState({hiddenProgress: true})
    this.setState({hiddenError:true})
  }  

  onClickRemove(){
    this.props.unsetMedia()
    this.setState({progress: 0})
    this.setState({hiddenProgress: true})
    this.setState({hiddenError:true})
  }

  onSignedUrl(context, resp){
    if(resp.status === "error" ){
      this.setState({error:resp.message})
      this.setState({hiddenError:false})
      return    
    }else{
      this.setState({error:''})      
      this.setState({hiddenError:true})
    }
  }

  render(){

    const style = {
      marginLeft: 10
    }

    const imageStyle = {
        objectFit: 'cover',
        backgroundSize: 'cover',
        width: '100%',
        height: '30%',
    }

    const create = [ <RaisedButton style={style} label={this.props.locales.locales.save} primary={true} keyboardFocused={true} onClick={this.props.onClickSave}/>]
    const update = [ <RaisedButton style={style} label={this.props.locales.locales.update} primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.delete} secondary={true} onClick={this.props.onClickDelete}/>]

    const actions = this.props.isUpdate ? update : create
    const user_id = this.props.currentUser.user_id
    const artist_id = this.props.artistDetail.artistDetail.id


    return (
           <Dialog
            style={{paddingLeft: 20, paddingRight: 20}}
            contentStyle={customContentStyle}
            open={this.props.onShow}
            title={
              <div style={{padding: 20, paddingTop: 10, paddingBottom: 10, fontSize: 14, fontWeight: 500}}>
              <span>{strings.formatString(this.props.locales.locales.review, {name: this.props.formTitle || this.props.artistDetail.artistDetail.name})}</span>
              <IconButton style={{float: 'right', top: 2, right: 5, position: 'absolute'}} onClick={this.props.onClickClose}><NavigationClose /></IconButton>
              </div>
            }
            modal={false}
            actions={actions}
            autoScrollBodyContent={true}
          >
            <br />

              <div>
                <Alert hidden={this.state.hiddenError}>
                  {this.state.error}
                </Alert>
               <LinearProgress hidden={this.state.hiddenProgress} variant="determinate" value={this.state.progress} />

              </div>
        
              <div>
               {isImage(this.props.formMedia) ? <img alt="" style={imageStyle} src={this.props.formMedia} /> : <ReactPlayer width='100%' height='auto' url={this.props.formMedia} controls={true} />}
               {
                this.props.formMedia ? 
                  <FlatButton style={{float: 'right'}} label={this.props.locales.locales.deleteMedia} secondary={true} onClick={(e) => this.onClickRemove(e, this)} />
                :
                  null
               }
                <FlatButton
                   primary={true}
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
                  onSignedUrl={(resp) => this.onSignedUrl(this, resp)}
                  onProgress={(val) => this.onUploadProgress(this, val)}
                  onError={(msg) => this.onUploadError(this, msg)}
                  onFinish={(obj) => this.onUploadFinish(this, obj)}
                  signingUrlHeaders={ this.headers }
                  signingUrlQueryParams={{ user_id: user_id, artist_id: artist_id }}
                  signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                  contentDisposition="auto"
                  scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                  inputRef={cmp => this.uploadInput = cmp}
                  autoUpload={true}
                  /> 
                </FlatButton>

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
              floatingLabelText={this.props.locales.locales.reviewBodyLabel}
              hintText={this.props.locales.locales.reviewHint}
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
