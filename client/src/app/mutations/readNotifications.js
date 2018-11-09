import gql from 'graphql-tag';

const readNotifications = (gql`
    mutation readNotifications($user_id: ID!) {
        readNotifications(input: {
            user_id: $user_id,
        })
        {
            user{
                notifications {
                    kind
                }
            }
        }
    }
`);

export default readNotifications