import React from 'react';
import ReviewListItem from './ReviewListItem'

const Review = (props) => {

	if(props.reviews !== undefined){
		const reviewItems = props.reviews.map((review) => {
			return (
				<ReviewListItem
					onReviewSelect={props.onReviewSelect}
					key={review.id}
					match={props.match}
					userId={props.user.user_id}
					review={review} 
				/>
			) 
		})
		return (
			<div>
				{reviewItems}
			</div>
		)
	} else {
		return null
	}

}

export default Review;