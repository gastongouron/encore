import gql from 'graphql-tag';

const UserProfileQuery = (gql`
    query UserProfileQuery($id: ID!) {
	    user(id: $id) {
            email
	        first_name
            last_name
            id
            display_name
            profile_picture
			reviews {
                artist_id
                artist_name
				body
                score
                user_id
                id
			}
	    }
    }
`);

export default UserProfileQuery