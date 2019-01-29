import { connect } from 'react-redux'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
// import FlatButton from 'material-ui/FlatButton'
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
import Grid from '@material-ui/core/Grid'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileAttachment from 'material-ui/svg-icons/file/attachment';
import ContentRemove from 'material-ui/svg-icons/action/delete';
import theme from '../../theme'
import Divider from 'material-ui/Divider'

class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      performance: parseFloat(this.props.formPerformanceScore),
      generosity: parseFloat(this.props.formGenerosityScore),
      technics: parseFloat(this.props.formTechnicsScore),
      ambiant: parseFloat(this.props.formAmbiantScore),
      body: this.props.formValue,
      userId: this.props.currentUser.user_id,
      artistId: this.props.artistDetail.artistDetail.artist_id, 
      progress: 0,
      hiddenProgress: true,
      error: '',
      hiddenError: true,
      errorText: '',
      disabled: true,
    };
  }

  onSlidePerf(e, value) {
    this.setState({performance: value});
    this.props.setPerformanceScore(value)
  }

  onSlideGenerosity(e, value) {
    this.setState({generosity: value});
    this.props.setGenerosityScore(value)
  }

  onSlideTechnics(e, value) {
    this.setState({technics: value});
    this.props.setTechnicsScore(value)
  }

  onSlideAmbiant(e, value) {
    this.setState({ambiant: value});
    this.props.setAmbiantScore(value)
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
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 500);
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

changeValue(e, type) {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
}
  // displayError(){
      // console.log("in displayError")
      // console.log('has been called')
      // this.setState({disabled: true})
      // this.setState({error:"hahaha"})
      // this.setState({hiddenError:false})
  // }
  
  shouldBeDisabled(){

    let form = {
      body: this.props.formValue,
      performance: this.props.formPerformanceScore,
      generosity: this.props.formGenerosityScore,
      technics: this.props.formTechnicsScore,
      ambiant: this.props.formAmbiantScore
    }  


      for (var prop in form) {
        if (!form[prop] && this.state.progres !== 0) {
          return true
        }      
      }
      
      if (!this.state.hiddenProgress){
        return true
      } else if (form["body"].length < 20) {
        return true
      } else if (form["body"].length > 1000) {
        return true
      } else {
        return false
      }
      return false

  }

  render(){

    const style = {
      marginLeft: 10
    }

    const sliderStyle = {
      marginTop: '-20px', 
      marginBottom: '-30px',
      paddingLeft: 5,
      paddingRight: 10,
    }

    const imageStyle = {
        display: 'block',
        margin: '0 auto',
        width: '100%',
        height: 120,
        objectFit: 'cover'
    }

    const rootz = {
      flexGrow: 1,
      padding: 20,
      paddingBottom: 0,
    }

    const leftAndRightPadded = {
      paddingLeft: 20,
      paddingRight: 20
    }

    const title = {
      color: theme.palette.textColor,
      fontSize: 14,
      paddingTop: 5,
    }

    const subtitle = {
      color: theme.palette.secondaryTextColor,
      fontSize: 12,
      paddingTop: 4,
      paddingBottom: 5
    }

    const label = {
      fontSize: 12,
      color: theme.palette.textColor,
      paddingTop: 5,
    }

    const labelRight = {
      fontSize: 12,
      float: 'right',
      paddingTop: 4,
    }

    const customContentStyle = {
      width: '100%',
      maxWidth: '460px'
    };

    const disabled = this.shouldBeDisabled()
    const create = [ <RaisedButton 
                      label={this.props.locales.locales.save} 
                      disabled={disabled} 
                      fullWidth={true} 
                      primary={true} 
                      keyboardFocused={true} 
                      onClick={this.props.onClickSave}/>
                      ]
    const update = [ <RaisedButton style={style} label={this.props.locales.locales.update} disabled={this.shouldBeDisabled()} primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
                     <RaisedButton style={style} label={this.props.locales.locales.delete} secondary={true} onClick={this.props.onClickDelete}/>]

    const actions = this.props.isUpdate ? update : create
    const user_id = this.props.currentUser.user_id
    const artist_id = this.props.artistDetail.artistDetail.id

    return (
           <Dialog
            contentStyle={customContentStyle}
            bodyStyle={{padding: 0}}
            open={this.props.onShow}
            repositionOnUpdate={true}
            title={
              <div style={{padding: 22, paddingTop: 10, paddingBottom: 10, fontSize: 14, fontWeight: 500}}>
                <span>{strings.formatString(this.props.locales.locales.review, {name: this.props.formTitle || this.props.artistDetail.artistDetail.name})}</span>
                <IconButton style={{float: 'right', top: 2, right: 5, position: 'absolute'}} onClick={this.props.onClickClose}><NavigationClose /></IconButton>
              </div>
            }
            modal={false}
            actions={actions}
            autoScrollBodyContent={true}
          >

              <div>
                <Alert style={{marginTop: 0, marginBottom: 0, textAlign: 'center'}} hidden={this.state.hiddenError}>
                  {this.state.error}
                </Alert>
               <LinearProgress hidden={this.state.hiddenProgress} variant="determinate" value={this.state.progress} />
              </div>

              {isImage(this.props.formMedia) ? <img alt="" style={imageStyle} src={this.props.formMedia} /> : <ReactPlayer width='100%' height='auto' url={this.props.formMedia} controls={true} />}
               {
                this.props.formMedia ? 
                  <div>
                    <FloatingActionButton mini={true} style={{float: 'right', marginRight: 15, marginTop: -20}} secondary={true} onClick={(e) => this.onClickRemove(e, this)}> <ContentRemove /></FloatingActionButton>
                    <br />
                  </div>
                :
                  null
               }

        <div style={rootz}>
          <span style={title}>{this.props.locales.locales.performance}</span>
          <br/>
          <span style={subtitle}>{this.props.locales.locales.performance}</span>
          <Grid container>
            
            <Grid item xs={3}>
              <span style={label}>{this.props.locales.locales.performance}</span>
            </Grid>
            <Grid item xs={8}>
              <Slider 
                style={sliderStyle}
                step={1} 
                value={parseFloat(this.props.formPerformanceScore)}
                min={0}
                max={5}
                onChange={this.onSlidePerf.bind(this)}
                required={true}
                />
              </Grid>
            <Grid item xs={1}>
              <span style={labelRight}>{this.props.formPerformanceScore ? this.props.formPerformanceScore + " / 5" : "0 / 5" }</span>
            </Grid>

            <Grid item xs={3}>
              <span style={label}>{this.props.locales.locales.generosity}</span>
            </Grid>
            <Grid item xs={8}>
              <Slider 
                style={sliderStyle}
                step={1} 
                value={parseFloat(this.props.formGenerosityScore)}
                min={0}
                max={5}
                onChange={this.onSlideGenerosity.bind(this)}
                required={true}
                />
            </Grid>
            <Grid item xs={1}>
              <span style={labelRight}>{this.props.formGenerosityScore ? this.props.formGenerosityScore + " / 5" : "0 / 5" }</span>
            </Grid>

            <Grid item xs={3}>
              <span style={label}>{this.props.locales.locales.technics}</span>
            </Grid>
            <Grid item xs={8}>
              <Slider 
                style={sliderStyle}
                step={1} 
                value={parseFloat(this.props.formTechnicsScore)}
                min={0}
                max={5}
                onChange={this.onSlideTechnics.bind(this)}
                required={true}
                />
            </Grid>
            <Grid item xs={1}>
              <span style={labelRight}>{this.props.formTechnicsScore ? this.props.formTechnicsScore + " / 5" : "0 / 5" }</span>            </Grid>

            <Grid item xs={3}>
              <span style={label}>{this.props.locales.locales.ambiant}</span>
            </Grid>
            <Grid item xs={8}>
              <Slider 
                style={sliderStyle}
                step={1} 
                value={parseFloat(this.props.formAmbiantScore)}
                min={0}
                max={5}
                onChange={this.onSlideAmbiant.bind(this)}
                required={true}
                />
            </Grid>
            <Grid item xs={1}>
              <span style={labelRight}>{this.props.formAmbiantScore ? this.props.formAmbiantScore + " / 5" : "0 / 5" }</span>
            </Grid>


          </Grid>
        </div>

        <Divider />

        <div style={leftAndRightPadded}>
          
            <TextField
              floatingLabelText={this.props.locales.locales.reviewBodyLabel}
              hintText={this.props.locales.locales.reviewHint}
              id="body"
              type="text"
              label="Review"
              // onChange={this.onChange.bind(this)}
              multiLine={true}
              rows={1}
              errorText={ this.props.formValue === undefined || (this.props.formValue === "" || (this.props.formValue.length <= 1 || this.props.formValue.length >= 20)) ? false : "must be 20 chars minumum"}
              // hintText="Hint Text"
              // errorText={this.value.length > 20 ? "" : "This field is required"}
              // floatingLabelText="Floating Label Text"
              // errorStyle={}
              maxLength="1000"
              minLength="20"
              value={this.props.formValue}
              onChange={this.props.setBody}      
              fullWidth={true}       
            />
         </div>


              <div style={{paddingTop: 10, textAlign: 'center', paddingLeft: 40, paddingRight: 40}}>
              <span style={label}>{strings.formatString(this.props.locales.locales.enrich, {artistname: this.props.artistDetail.artistDetail.name})}</span><br/>
              <br/>
                <RaisedButton
                   default={true}
                   icon={<FileAttachment />}
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
                </RaisedButton>

              </div>
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
