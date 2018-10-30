import React, { Component } from 'react';
import SocialListItem from './SocialListItem'
import _ from 'underscore'

class SocialList extends Component {

	constructor(props){
		super(props)
	}

	render(){

		const users= this.props.users

		if(users !== undefined){
								
			const count = Object.keys(users).length

			const userItems = users.map((user) => {
				return (
					<SocialListItem
						key={user.id}
						user={user} 
					/>
				) 
			})

			return (
				<div>
					<div>
						{count}&nbsp;{this.props.title}:
						{userItems}
					</div>
				</div>
			)
		} else {
			return null
		}


	}

}

export default SocialList;
