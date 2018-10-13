import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

const ReviewListItem = (props) => {

	const userId = props.userId
	const review = props.review
	const onReviewSelect = props.onReviewSelect
	const belongsToUser = (userId == review.user_id)

	console.log('user ID', userId)
	console.log('review', review.user_id)

	const style = {
	    objectFit: 'cover',
	    width: 20,
	    height: 20,
	    borderRadius: 10,
	    marginRight: 3,
		float: 'left',
	}

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

	const leftSide = {
		marginRight: 20,
	    float:'left'
	}

	// const EditButton = () => {
		// if (userId == review.user_id){
		// 	return (
		// 	<div>
		// 		<button onClick={ () => onReviewSelect(review) }>
		// 			edit
		// 		</button>
		// 	</div>
		// 	)
		// } else {

		// }
	// }

// check path.. if contains user and user is current user id display user component for reviews
// 

//					<br />
//                    { userId == review.user_id ? 
//						<RaisedButton 
//						onClick={ () => {if (userId == review.user_id) {onReviewSelect(review)}}}
//						primary={true}
//						label={'edit'}/> 
//                    : 
//                    	<p></p> 
//                   	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={false}  
				className="">
				<div>
				</div>
				<div style={textStyle}>
					{ review.author_display_name ? 
						<div> 
							<Link to={'/user/'+ review.user_id}>{review.author_display_name}</Link>
	                        <img alt='meaningful text' style={style} src={review.author_profile_picture}/>

						</div> 

					: 	
						<div>
							<h1>
								<Link to={'/artists/'+ review.artist_id}>{review.artist_name}</Link>
							</h1>
							<br />
						</div>
					}
					{review.body}

					<br />
				</div>

				<div style={noteStyle}>
					<h1>{review.score}</h1>
				</div>

				<div style={noteStyle}>

                    { belongsToUser ? 
						<RaisedButton 
							onClick={ () => onReviewSelect(review) }
							default={true}
							label={'edit'}/> 
                    : 
                    	<p></p> 
                   	}
				</div>


			</Paper>
		)

}

export default ReviewListItem;