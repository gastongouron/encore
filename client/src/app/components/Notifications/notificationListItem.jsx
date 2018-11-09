import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
// import { Link } from 'react-router-dom'
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
	  minWidth: '100%'
	};

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={true} >

				id: {notification.id}
				<br />
				kind: {notification.kind}
				<br />
				artist_name: {notification.artist_name}
				<br />
				author_display_name: {notification.author_display_name}
				<br />
				created_at: {notification.created_at}
				<br />
				follower_display_name: {notification.follower_display_name}
				<br />
				kind: {notification.kind}
				<br />
				read: {notification.read}


			</Paper>
		)

}




const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default connect(mapStateToProps, null)(NotificationItem)