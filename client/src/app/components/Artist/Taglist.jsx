import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    marginLeft: 2,
    padding:2,
    fontSize: 13,
    background: "#F1F1F1"
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
					index < 5 ?
			        <Chip 
			        	key={index} 
			        	style={styles.chip}
			        	onClick={ () => this.props.onClickTag(tag)}>
			        	<span style={{fontSize: 10}}>{tag}</span> 
			        </Chip>			
					:
						null
					
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