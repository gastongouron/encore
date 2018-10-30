import gql from 'graphql-tag';

const followUserMutation = (gql`
    mutation followUserMutation($follower_id: ID!, $followee_id: ID!) {
        followUser(input: {
            follower_id: $follower_id,
            followee_id: $followee_id
        })
        {
            user{
                locale
                id
                first_name
                last_name
                display_name
                profile_picture
                email                
                followers {
                    id
                    display_name
                }
                following_users {
                    id
                    display_name
                }
            }
        }
    }
`);

export default followUserMutation