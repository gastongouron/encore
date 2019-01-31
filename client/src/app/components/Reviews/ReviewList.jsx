import React, { Component } from 'react';
import ReviewListItem from './ReviewListItem'
import _ from 'underscore'

class Review extends Component {

	constructor(props){
		super(props)

	}

	superSort(reviews){
		reviews.sort(function(a, b){
	    var keyA = new Date(a.updated_at),
	        keyB = new Date(b.updated_at);
	    // Compare the 2 dates
	    if(keyA < keyB) return -1;
	    if(keyA > keyB) return 1;
	    return 0;
	});
	}

	render(){

		const reviews = this.props.reviews
		const user = this.props.user
		// console.log(ok)

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
