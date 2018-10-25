import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

class Taglist extends Component {

	// constructor(props){
	// 	super(props)
	// }

	render(){

		if(this.props.tags !== undefined){
			const tagItems = this.props.tags.split(',').map((tag, index) => {
				return (
			        <Chip 
			        	key={index} 
			        	style={styles.chip}
			        	onClick={ () => this.props.onClickTag(tag)}>
			        	{tag} 
			        </Chip>			
				) 
			})
			return (
				<div style={styles.wrapper}>
					{tagItems}
				</div>
			)
		} else {
			return null
		}
	}
}

export default Taglist