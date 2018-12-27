import gql from 'graphql-tag';

const usersHomeQuery = (gql`
    query usersHomeQuery {
	    usersHome {
	        id
	        first_name
	        profile_picture
	    }
    }
`);

export default usersHomeQuery