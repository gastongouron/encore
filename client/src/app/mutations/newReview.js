import gql from 'graphql-tag';

const newReviewMutation = (gql`
    mutation newReviewMutation($user_id: ID!, $artist_id: ID!, $body: String!, $score: Float!, $media: String) {
        newReview(input: {
            user_id: $user_id,
            artist_id: $artist_id,
            body: $body,
            score: $score,
            media: $media
        })
        {
            review{
                id
                user_id
                body
                author_display_name
                author_profile_picture
                created_at
                updated_at
                score
                media
            }
            
        }
    }
`);

export default newReviewMutation