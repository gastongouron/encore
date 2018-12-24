import React, { Component } from 'react';
import ReviewListItem from './ReviewListItem'
import _ from 'underscore'

class Review extends Component {

	constructor(props){
		super(props)

	}

	render(){

		const reviews = this.props.reviews
		const user = this.props.user

		if(reviews !== undefined){
								
			const reviewItems = reviews.map((review) => {
				return (
					<ReviewListItem
						onReviewSelect={this.props.onReviewSelect}
						key={review.id+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}
						match={this.props.match}
						belongsToUser={this.props.onCurrentUserProfile}
						review={review} 
					/>
				) 
			})
			return (
				<div>
					<div>
						{reviewItems}
					</div>
				</div>
			)
		} else {
			return null
		}


	}

}

export default Review;
