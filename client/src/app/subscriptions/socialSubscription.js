import gql from 'graphql-tag';

const profileSubscription = (gql`
    subscription reviewWasAdded($user_id: ID!) {
    	userWasChanged(user_id: $user_id) {
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

export default profileSubscription;
