import React, { Component } from 'react';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo'
import UserNotificationsQuery from '../../queries/UserNotificationsSchema'
import readNotifications from '../../mutations/readNotifications'
import { initUserNotifications, loadingUserNotifications, failedUserNotifications, setUserNotifications } from '../../actions/notifications'
import NotificationList from './notificationList'
import notificationsSubscription from '../../subscriptions/notificationsSubscription'

class Notifications extends Component {

	constructor(props){
		super(props)
		this.state = {
			hasMore: true
		}
	}

    componentWillMount(){
        this.props.loadingUserNotifications();

	    let observable = this.props.client.subscribe({ query: notificationsSubscription, variables: {user_id: this.props.userId}})
	    this.setState({observable: observable})

        this.props.client.networkInterface.query({query: UserNotificationsQuery, variables: {id: this.props.userId }, fetchPolicy: 'network-only'})
        .then(
            (res) => {
            	console.log(res)
                this.props.setUserNotifications(res.data.user.notifications)
            },
            (err) => {
                this.props.failedUserNotifications(err.data);
            }
        );
    }

    readAll(){
    	this.props.client.mutate({mutation: readNotifications, variables: {user_id: this.props.userId}}).then(
        (res) => {
    		console.log(res)
        },
        (err) => { }
        );
    }

    componentDidMount(){
    	this.readAll()
	    const ctx = this
	    const subscription = this.state.observable.subscribe({
	        next(data) {
	            if(data){
	            	console.log(data.notificationsTicker.notifications)
	                ctx.props.setUserNotifications(data.notificationsTicker.notifications)
	            }
	        },
	        error(err) { console.error('err', err); },
	      });
	    this.setState({subscription: subscription})
    }

    componentWillUnmount(){
        this.state.subscription.unsubscribe()
    }

	render(){	

		return(
			<div>
				<NotificationList hasMore={this.state.hasMore} notifications={this.props.notifications.notifications}/>
			</div>
		)		
	}
}

const mapStateToProps = state => {
    return { 
        locales: state.locales,
        notifications: state.notifications
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initUserNotifications: () => dispatch(initUserNotifications()),
        loadingUserNotifications: () => dispatch(loadingUserNotifications()),
        failedUserNotifications: (message) => dispatch(failedUserNotifications(message)),
        setUserNotifications: (notifications) => dispatch(setUserNotifications(notifications)),
    };
};

export default withApollo(connect(mapStateToProps, mapDispatchToProps)(Notifications));