import React from 'react';
import { Link } from 'react-router-dom'
import theme from '../../theme'

const SocialListItem = (props) => {

	const user = props.user

	return (
			<div>
        		<Link style={{color: theme.palette.primary1Color}} to={'/user/'+ user.id}>
        			{user.display_name}
    			</Link>
			</div>
		)

}


export default SocialListItem;
