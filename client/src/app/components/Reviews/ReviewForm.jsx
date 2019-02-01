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
import Grid from '@material-ui/core/Grid'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileAttachment from 'material-ui/svg-icons/file/attachment';
import ContentRemove from 'material-ui/svg-icons/action/delete';
import theme from '../../theme'
import Divider from 'material-ui/Divider'
import Star from 'material-ui/svg-icons/toggle/star';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';


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
    finished: false,
    stepIndex: 0,
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
handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

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

  renderStepActions(step) {
    const {stepIndex} = this.state;



    // const action : this.props.isUpdate ? update : create
    //   const create = [ <RaisedButton 
    //                   label={this.props.locales.locales.save} 
    //                   disabled={disabled} 
    //                   style={{padding: 0}}
    //                   fullWidth={true} 
    //                   primary={true} 
    //                   keyboardFocused={true} 
    //                   onClick={this.props.onClickSave}/>
    //                   ]
    // const update = [ 
    //                  <RaisedButton style={{width:"50%"}} label={this.props.locales.locales.update} disabled={this.shouldBeDisabled()} primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>]

    // const actions = this.props.isUpdate ? update : create


    return (
      <div style={{margin: '0'}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            style={(this.state.stepIndex === 2 && this.props.isUpdate) ? {width: '33%', padding: 0} : {width: '50%', padding: 0}}
            onClick={this.handlePrev}
          />

        {this.state.stepIndex === 2 ? 
              this.props.isUpdate ? 
                 <RaisedButton style={{width:"34%"}} label={this.props.locales.locales.delete} secondary={true} onClick={this.props.onClickDelete}/>
              : 
                null  
            : 
          false
        }


        <RaisedButton
          label={stepIndex === 2 ? this.props.isUpdate ? this.props.locales.locales.update : this.props.locales.locales.save  : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          disabled={stepIndex === 0 ? this.step1validation() : this.shouldBeDisabled() }
          onClick={stepIndex === 2 ? (this.props.isUpdate ? this.props.onClickUpdate : this.props.onClickSave) : this.handleNext}
          style={(this.state.stepIndex === 2 && this.props.isUpdate) ? {width: '33%', padding: 0} : {width: '50%', padding: 0}}
        />

      </div>
    );
  }


  // displayError(){
      // console.log("in displayError")
      // console.log('has been called')
      // this.setState({disabled: true})
      // this.setState({error:"hahaha"})
      // this.setState({hiddenError:false})
  // }

  step1validation(){
      let form = {
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
      return false      

  }
  
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
    const {finished, stepIndex} = this.state;

    // const style = {
    //   marginLeft: 10
    // }

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
      // paddingLeft: 20,
      // paddingRight: 20
      paddingBottom: 20,
    }

    const title = {
      color: theme.palette.textColor,
      fontSize: 14,
      paddingTop: 5,
    }

    const subtitle = {
      color: theme.palette.disabledColor,
      fontSize: 11,
      paddingTop: 2,
      paddingBottom: 2
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

    const testLabelRight = {
      fontSize: 12,
      float: 'right',
      paddingTop: 0,
      marginTop: -7,
    }

    const customContentStyle = {
      top: 0,
      width: '100%',
      height: '100%',
      maxWidth: '460px',
      maxHeight: '1000px'
    };

    // const disabled = this.shouldBeDisabled()

    // const create = [ <RaisedButton 
    //                   label={this.props.locales.locales.save} 
    //                   disabled={disabled} 
    //                   style={{padding: 0}}
    //                   fullWidth={true} 
    //                   primary={true} 
    //                   keyboardFocused={true} 
    //                   onClick={this.props.onClickSave}/>
    //                   ]
    // const update = [ 
    //                  <RaisedButton style={{width:"50%"}} label={this.props.locales.locales.update} disabled={this.shouldBeDisabled()} primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>]

    // const actions = this.props.isUpdate ? update : create
    const user_id = this.props.currentUser.user_id
    const artist_id = this.props.artistDetail.artistDetail.id

    // console.log(this.state.stepIndex)

    return (
           <Dialog

            contentStyle={customContentStyle}
            bodyStyle={{padding: 0}}
            open={this.props.onShow}
            repositionOnUpdate={true}
            title={
              <div style={{padding: 22, paddingTop: 10, paddingBottom: 0, fontSize: 14, fontWeight: 500}}>
                <h2>{this.props.formTitle || this.props.artistDetail.artistDetail.name}</h2>
                <IconButton style={{float: 'right', top: 2, right: 5, position: 'absolute'}} onClick={this.props.onClickClose}><NavigationClose /></IconButton>
              </div>
            }
            modal={false}
            // actions={actions}
            actions={this.state.stepIndex === 0 ? this.renderStepActions(1) : this.state.stepIndex === 1 ? this.renderStepActions(1) : this.renderStepActions(2)}
            actionsContainerStyle={{padding: 0}}
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


          <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                  <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                      <StepLabel>{this.props.locales.locales.step1Title}</StepLabel>
                      <StepContent>
                        <p>{this.props.locales.locales.step1Subtitle}</p>

                        <Grid container>
                          <Grid item xs={4}>
                            <span style={label}>{this.props.locales.locales.performance}</span>
                          </Grid>
                          <Grid item xs={6}>
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
                          <Grid item xs={2}>
                            <span style={{color: (this.props.formPerformanceScore && this.props.formPerformanceScore !== null) ? theme.palette.textColor : theme.palette.disabledColor}}>
                              <span style={testLabelRight}>{this.props.formPerformanceScore ? this.props.formPerformanceScore : "0" }
                               <Star color={this.props.formPerformanceScore ? theme.palette.starColor : theme.palette.disabledColor} viewBox="-8 -14 34 34"/>
                              </span>
                            </span>
                          </Grid>

                          <Grid item xs={4}>
                            <span style={label}>{this.props.locales.locales.generosity}</span>
                          </Grid>
                          <Grid item xs={6}>
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
                          <Grid item xs={2}>
                            <span style={{color: (this.props.formGenerosityScore && this.props.setGenerosityScore !== null) ? theme.palette.textColor : theme.palette.disabledColor}}>
                              <span style={testLabelRight}>{this.props.formGenerosityScore ? this.props.formGenerosityScore : "0" }
                               <Star color={this.props.formGenerosityScore ? theme.palette.starColor : theme.palette.disabledColor} viewBox="-8 -14 34 34"/>
                              </span>
                            </span>
                          </Grid>

                          <Grid item xs={4}>
                            <span style={label}>{this.props.locales.locales.technics}</span>
                          </Grid>
                          <Grid item xs={6}>
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
                          <Grid item xs={2}>
                            <span style={{color: (this.props.formTechnicsScore && this.props.setGenerosityScore !== null) ? theme.palette.textColor : theme.palette.disabledColor}}>
                              <span style={testLabelRight}>{this.props.formTechnicsScore ? this.props.formTechnicsScore : "0" }
                               <Star color={this.props.formTechnicsScore ? theme.palette.starColor : theme.palette.disabledColor} viewBox="-8 -14 34 34"/>
                              </span>
                            </span>
                    
                            </Grid>

                          <Grid item xs={4}>
                            <span style={label}>{this.props.locales.locales.ambiant}</span>
                          </Grid>
                          <Grid item xs={6}>
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
                          <Grid item xs={2}>
                            <span style={{color: (this.props.formAmbiantScore && this.props.setGenerosityScore !== null) ? theme.palette.textColor : theme.palette.disabledColor}}>
                              <span style={testLabelRight}>{this.props.formAmbiantScore ? this.props.formAmbiantScore : "0" }
                               <Star color={this.props.formAmbiantScore ? theme.palette.starColor : theme.palette.disabledColor} viewBox="-8 -14 34 34"/>
                              </span>
                            </span>

                          </Grid>


                        </Grid>


                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel>{this.props.locales.locales.step2Title}</StepLabel>
                      <StepContent>
                        <p>{this.props.locales.locales.step2Subtitle}</p>
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
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel>{this.props.locales.locales.step3Title}</StepLabel>
                      <StepContent>
                          {strings.formatString(this.props.locales.locales.enrich, {artistname: this.props.artistDetail.artistDetail.name})}
                          <FlatButton
                          style={{marginBottom: 20,}}
                           primary={true}
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
                        </FlatButton>
                      </StepContent>
                    </Step>
                  </Stepper>
                  {finished && (
                    <p style={{margin: '20px 0', textAlign: 'center'}}>
                      <a
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                        }}
                      >
                        Click here
                      </a> to reset the example.
                    </p>
                  )}
                </div>

                <br/>
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
