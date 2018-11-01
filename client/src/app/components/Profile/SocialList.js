import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader';
import _ from 'underscore'


import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Toggle from 'material-ui/Toggle';

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
				      <ListItem
				      href={"/user/" + follower.id}
			        key={follower.id}
			        primaryText={follower.display_name}
			        leftAvatar={<Avatar src={follower.profile_picture} />}
			      />
				) 
			})

			const followingUserItems = followingUsers.map((followingUser) => {
				return (
				<ListItem
				    href={"/user/" + followingUser.id}
			        key={followingUser.id}
			        primaryText={followingUser.display_name}
			        leftAvatar={<Avatar src={followingUser.profile_picture} />}
			      />
				) 
			})

			return (
				<div>
					<div>
						<List>
				            <ListItem
				              primaryText={followersCount > 1 ? followersCount + " " + this.props.locales.locales.followers : followersCount + " " + this.props.locales.locales.follower }
				              initiallyOpen={false}
				              primaryTogglesNestedList={true}
				              nestedItems={followerItems}
				            />
				            <ListItem
				              primaryText={followingUsersCount > 1 ? followingUsersCount + " " + this.props.locales.locales.followings : followingUsersCount + " " + this.props.locales.locales.following }
				              initiallyOpen={false}
				              primaryTogglesNestedList={true}
				              nestedItems={followingUserItems}
				            />
				          </List>
					</div>
				</div>
			)
		} else {
			return null
		}

	}

}

const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(SocialList);
