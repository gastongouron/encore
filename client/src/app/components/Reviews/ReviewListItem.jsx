import React from 'react';
import Paper from 'material-ui/Paper';

const ReviewListItem = (props) => {

	const review = props.review
	const onReviewSelect = props.onReviewSelect

	const paperStyle = {
	  display: 'grid',
	  marginBottom: 20,
	  padding: 20,
	};

	const textStyle = {
		gridColumn: 1,
		textAlign: 'left',
	}

	const noteStyle = {
		gridColumn: 2,
  	    textAlign: 'right',
	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={false} 
                onClick={ () => onReviewSelect(review) } 
				className="">
				<div style={textStyle}>
					{review.body}
				</div>
				<div style={noteStyle}>
					{review.score}
				</div>
			</Paper>
		)

}

export default ReviewListItem;