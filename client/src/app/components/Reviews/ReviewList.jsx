import React from 'react';
import ReviewListItem from './ReviewListItem'

const Review = (props) => {
	const reviewItems = props.reviews.map((review) => {
		return (
			<ReviewListItem
				onReviewSelect={props.onReviewSelect}
				key={review.id}
				review={review} 
			/>
		) 
	})

	return (
		<div>
			{reviewItems}
		</div>
	)
}

export default Review;