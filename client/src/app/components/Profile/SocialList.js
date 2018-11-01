import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader';
import _ from 'underscore'

class SocialList extends Component {

	constructor(props){
		super(props)
	}

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
						<Subheader>{followersCount} {followersCount > 1 ? this.props.locales.locales.followers : this.props.locales.locales.follower }</Subheader>
						<List>
							{followerItems}
						</List>

						<Subheader>{followingUsersCount} {followingUsersCount > 1 ? this.props.locales.locales.followings : this.props.locales.locales.following } </Subheader>
						<List>
							{followingUserItems}
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
