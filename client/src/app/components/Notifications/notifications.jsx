import React, { Component } from 'react';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo'
import UserNotificationsQuery from '../../queries/UserNotificationsSchema'

class Notifications extends Component {

	constructor(props){
		super(props)
		console.log(props)
		// INIT WITH USER_ID
		// do the query thing for notifications
		// display notifications
	}

    componentWillMount(){
        // this.props.loadingUserProfile();
        // let observable = this.props.client.subscribe({ query: socialSubscription, variables: {user_id: this.props.match.params.id} })
        // this.setState({observable: observable})

        this.props.client.networkInterface.query({query: UserNotificationsQuery, variables: {id: this.props.userId }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
            	console.log(res)
                // this.props.setUserReviews(res.data.user.reviews);
                // this.props.setUserProfile(res.data.user)
            },
            (err) => {
            	console.log(err)
                // this.props.failedUserReviews(err.data);
                // this.props.failedUserProfile(err.data);
            }
        );
    }

	render(){	

		return(

				<div>
					cool
				</div>

		)		
	}
}

const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // initUserProfile: () => dispatch(initUserProfile()),
        // loadingUserProfile: () => dispatch(loadingUserProfile()),
        // failedUserProfile: (message) => dispatch(failedUserProfile(message)),
        // setUserProfile: (user) => dispatch(setUserProfile(user)),
        // updateUserReview: (review) => dispatch(updateUserReview(review)),
        // deleteUserReview: (review) => dispatch(deleteUserReview(review)),
        // initUserReviews: () => dispatch(initUserReviews()),
        // loadingUserReviews: () => dispatch(loadingUserReviews()),
        // failedUserReviews: (message) => dispatch(failedUserReviews(message)),
        // setUserReviews: (reviews) => dispatch(setUserReviews(reviews)),
        // selectUserReview: (review) => dispatch(selectUserReview(review))
    };
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Notifications));