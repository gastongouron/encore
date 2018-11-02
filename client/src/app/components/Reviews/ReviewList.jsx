import React, { Component } from 'react';
import ReviewListItem from './ReviewListItem'
import _ from 'underscore'

class Review extends Component {

	constructor(props){
		super(props)
	}

	sort(objects){
		return _.sortBy(objects,function(node){
		  - (new Date(node.created_at).getTime());
		});
	}

	render(){

		const reviews = this.sort(this.props.reviews).reverse()

		if(reviews !== undefined){
								
			const reviewItems = reviews.map((review) => {
				return (
					<ReviewListItem
						onReviewSelect={this.props.onReviewSelect}
						key={review.id+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}
						match={this.props.match}
						userId={this.props.user.user_id}
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
