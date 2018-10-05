import gql from 'graphql-tag';

const newReviewMutation = (gql`
    mutation newReviewMutation($user_id: ID!, $artist_id: ID!, $body: String!) {
        newReview(input: {
            user_id: $user_id,
            artist_id: $artist_id,
            body: $body
        })
        {
            review{
                user_id
                artist_id
                body
            }
            
        }
    }
`);

export default newReviewMutation