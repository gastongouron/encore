import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    marginLeft: 2,
    marginBottom: 2,
    // padding:2,
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

		const amount = window.innerWidth < 500 ? 3 : 5

		if(this.props.tags !== undefined){
			const tagItems = this.props.tags.split(',').map((tag, index) => {
				return (
					index < amount ?
					<div key={index}  style={{float: 'right'}}>
			        <Chip 
			        	style={styles.chip}
			        	onClick={ () => this.props.onClickTag(tag)}>
			        	<span style={{fontSize: 10}}>{tag}</span> 
			        </Chip>			
			        </div>
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