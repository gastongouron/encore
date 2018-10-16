import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import StarIcon from 'react-material-icons/icons/toggle/star';
import StarBorder from 'react-material-icons/icons/toggle/star-border';
import StarHalf from 'react-material-icons/icons/toggle/star-half';

import theme from '../../theme'
import Slider from 'material-ui/Slider';


class CustomForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: parseFloat(this.props.formScore)
    };
  }

  onSlide(e, value) {
    this.setState({rating: value});
    this.props.setScore(value)
  }

  render(){

    const style = {
      marginLeft: 10
    }

    const create = [ <RaisedButton style={style} label="Cancel" default={true} onClick={this.props.onClickClose}/>,
                     <RaisedButton style={style} label="Save" primary={true} keyboardFocused={true} onClick={this.props.onClickSave}/>]
    const update = [ <RaisedButton style={style} label="Update" primary={true} keyboardFocused={true} onClick={this.props.onClickUpdate}/>,
                     <RaisedButton style={style} label="Delete" secondary={true} onClick={this.props.onClickDelete}/>,
                     <RaisedButton style={style} label="Cancel" default={true} onClick={this.props.onClickClose}/>]

    const actions = this.props.isUpdate ? update : create

    const starStyle = {
      padding: 30,
      letterSpacing: 16,
      display: 'flex', 
      fontSize: 28,
      margin: 10,
      justifyContent: 'center'
    }

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

export default CustomForm 
