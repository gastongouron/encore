import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router-dom'
// import Taglist from './Taglist'
// import Grid from '@material-ui/core/Grid'
// import Divider from 'material-ui/Divider';
// import Truncate from 'react-truncate';
// import theme from '../../theme'

const NotificationItem = (props) => {

	const notification = props.notification

	const paperStyle = {
	  textAlign: 'left',
      margin: 2,
	  marginBottom: 20,
	  minWidth: '100%',
	  padding: 20
	};


	let expr = notification.kind
	switch (expr) {
		case 'follow':
			return (
				<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >
					You have been followed by <Link to={"/user/" + notification.follower_id}>{notification.follower_display_name}</Link>.
				</Paper>
				)
			break;
		case 'unfollow':
			return (
				<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >
					<Link to={"/user/" + notification.follower_id}>{notification.follower_display_name}</Link> has stopped following you.
				</Paper>
				)
			break
		case 'recommend':
			console.log(notification)
			return (
				<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >
					<Link to={"/user/" + notification.author_id}>{notification.author_display_name}</Link> has just shared an experience for <Link to={"/artists/" + notification.artist_id}>{notification.artist_name}</Link>.
				</Paper>
				)
			break

		default:
			console.log('unknown ' + expr + '.');
	}

}




const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default connect(mapStateToProps, null)(NotificationItem)