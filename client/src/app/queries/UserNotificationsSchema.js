import gql from 'graphql-tag';

const UserNotificationsQuery = (gql`
    query UserNotificationsQuery($id: ID!) {
	    user(id: $id) {
            id
            locale
            notifications {
                kind
                read
                follower_display_name
                artist_name
                author_display_name
                created_at
            }
	    }
    }
`);

export default UserNotificationsQuery