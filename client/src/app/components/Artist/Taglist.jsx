import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
  	zIndex: 4,
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    zIndex: 3,
    flexWrap: 'wrap',
  }
}

const handleClick = (e, tag) => {
	console.log(tag)
}

const Taglist = (props) => {

	if(props.tags !== undefined){
		const tagItems = props.tags.split(',').map((tag, index) => {
			return (
		        <Chip 
		        	key={index} 
		        	style={styles.chip}
		        	onClick={(e) => handleClick(e, tag)}>
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

export default Taglist