import gql from 'graphql-tag';

const UserNotificationsQuery = (gql`
    query UserNotificationsQuery($id: ID!) {
	    user(id: $id) {
            id
            locale
            notifications {
                id
                kind
                read
                follower_display_name
                follower_id
                artist_id
                author_id
                artist_name
                author_display_name
                picture
                created_at
            }
	    }
    }
`);

export default UserNotificationsQuery