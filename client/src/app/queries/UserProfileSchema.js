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
            followers {
                id
                display_name
            }
            following_users {
                id
                display_name
            }
			reviews {
                artist_id
                artist_name
                artist_profile_picture
				body
                score
                media
                user_id
                created_at
                updated_at
                id
			}
	    }
    }
`);

export default UserProfileQuery