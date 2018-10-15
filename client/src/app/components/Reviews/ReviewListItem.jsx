import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

const ReviewListItem = (props) => {

	const userId = props.userId
	const review = props.review
	const onReviewSelect = props.onReviewSelect
	const belongsToUser = (userId == review.user_id)
	const onUserProfile = props.match.includes('user')

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

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={false}  
				className="">
				<div>
				</div>
				<div style={textStyle}>
				
					{ !onUserProfile ? 
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