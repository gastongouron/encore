import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider';
import _ from 'underscore'

// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import ContentSend from 'material-ui/svg-icons/content/send';
// import Toggle from 'material-ui/Toggle';

const label = {
	color: "rgba(33, 33, 33, 0.54)",
	fontSize: '14px',
	fontWeight: '500'
}

class SocialList extends Component {

	constructor(props){
		super(props)
		this.state = { open: true };
	}

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };


	render(){

		const followers= this.props.followers
		const followingUsers= this.props.followingUsers

		if(followers && followingUsers){
								
			const followersCount = Object.keys(followers).length
			const followingUsersCount = Object.keys(followingUsers).length

			const followerItems = followers.map((follower) => {
				return (
					<ListItem key={follower.id} innerDivStyle={{ textDecoration: 'none', padding: 0, margin: 0}}>
						<Link to={"/user/" + follower.id}  style={{ textDecoration: 'none' }}>
					      <ListItem
					        primaryText={follower.display_name}
					        leftAvatar={<Avatar src={follower.profile_picture} />}
					      />
						</Link>
					</ListItem>
				) 
			})

			const followingUserItems = followingUsers.map((followingUser) => {
				return (
					<ListItem key={followingUser.id} onClick={console.log('NICEEEE')} innerDivStyle={{ textDecoration: 'none', padding: 0, margin: 0}}>
						<Link to={"/user/" + followingUser.id}  style={{ textDecoration: 'none' }}>
					      <ListItem
					        primaryText={followingUser.display_name}
					        leftAvatar={<Avatar src={followingUser.profile_picture} />}
					      />
						</Link>
					</ListItem>
				) 
			})

			return (

						<List style={{padding: 0}}>
				            <ListItem
				              primaryText={<span style={label}>{followersCount > 1 ? followersCount + " " + this.props.locales.locales.followers : followersCount + " " + this.props.locales.locales.follower}</span> }
				              initiallyOpen={false}
				              primaryTogglesNestedList={true}
				              nestedItems={followerItems}
				            />
							<Divider />
				            <ListItem
				              primaryText={<span style={label}>{followingUsersCount > 1 ? followingUsersCount + " " + this.props.locales.locales.followings : followingUsersCount + " " + this.props.locales.locales.following}</span> }
				              initiallyOpen={false}
				              primaryTogglesNestedList={true}
				              nestedItems={followingUserItems}
				            />
				          </List>

			)
		} else {
			return null
		}

	}

}

const mapStateToProps = state => {
    return { 
        locales: state.locales,
        userInfo: state.currentUser
    };
};

export default connect(mapStateToProps, null)(SocialList);
