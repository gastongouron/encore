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
            locale
            followers {
                id
                display_name
                profile_picture
            }
            following_users {
                id
                display_name
                profile_picture
            }
			reviews {
                artist_id
                artist_name
                artist_profile_picture
				body
                total
                score
                generosity
                technics
                ambiant
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