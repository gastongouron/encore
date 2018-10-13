import gql from 'graphql-tag';

const newReviewMutation = (gql`
    mutation newReviewMutation($user_id: ID!, $artist_id: ID!, $body: String!, $score: String!) {
        newReview(input: {
            user_id: $user_id,
            artist_id: $artist_id,
            body: $body,
            score: $score
        })
        {
            review{
                id
                user_id
                body
                author_display_name
                author_profile_picture
                score
            }
            
        }
    }
`);

export default newReviewMutation