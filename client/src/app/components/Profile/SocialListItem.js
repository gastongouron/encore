import React from 'react';
import { Link } from 'react-router-dom'
import theme from '../../theme'

const SocialListItem = (props) => {

	const user = props.user

	return (
			<span>
        		<Link style={{color: theme.palette.primary1Color}} to={'/user/'+ user.id}>
        			{user.display_name}&nbsp;
    			</Link>
			</span>
		)

}


export default SocialListItem;
