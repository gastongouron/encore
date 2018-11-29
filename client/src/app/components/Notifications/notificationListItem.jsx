import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Avatar from 'material-ui/Avatar'
import Grid from '@material-ui/core/Grid'

const NotificationItem = (props) => {

	const notification = props.notification
	const formatter = buildFormatter(frenchStrings)
	const color = notification.read === 'true' ? 'white' : '#EEF7FA'

	const paperStyle = {
	  display: "flex",
	  background: color,
	  textAlign: 'left',
      margin: 2,
	  marginBottom: 20,
	  minWidth: '100%',
	  padding: 20
	};

	const rootz = {
	  flexGrow: 1,
	}

	let expr = notification.kind
	const date = <TimeAgo style={{color: 'grey', fontSize: '0.77em'}} date={notification.created_at} formatter={props.locales.locales._language === 'en' ? undefined : formatter}/>
	const avatar = <Avatar style={{marginRight: 10}} src={notification.picture ? notification.picture : null} />

	switch (expr) {
		case 'follow':
			return (
				<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >
					{avatar}
					<div style={{display: "block"}}>
						<Link to={"/user/" + notification.follower_id}>{notification.follower_display_name}</Link> {props.locales.locales.followedBy}.
						<br />
						{date}					
					</div>
				</Paper>
				)
			
		case 'unfollow':
			return (
				<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >
					{avatar}
					<div style={{display: "block"}}>
						<Link to={"/user/" + notification.follower_id}>{notification.follower_display_name}</Link> {props.locales.locales.unfollowedBy}.
						<br />
						{date}
					</div>
				</Paper>
				)
			
		case 'recommend':
			return (
				<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >
					{avatar}
					<div style={{display: "block"}}>
						<Link to={"/user/" + notification.author_id}>{notification.author_display_name}</Link> {props.locales.locales.recommend} <Link to={"/artists/" + notification.artist_id}>{notification.artist_name}</Link>.
						<br />
						{date}
					</div>
				</Paper>
				)
			

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