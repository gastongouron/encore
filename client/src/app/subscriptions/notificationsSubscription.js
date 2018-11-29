import gql from 'graphql-tag';

const notificationsSubscription = (gql`
    subscription notificationsTicker($user_id: ID!) {
    	notificationsTicker(user_id: $user_id) {
            id
			notifications {
                id
                kind
                read
                follower_id
                artist_id
                author_id
                follower_display_name
                picture
                artist_name
                author_display_name
                created_at
    		}
    	}
    }
`);

export default notificationsSubscription;
