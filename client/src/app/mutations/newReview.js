import gql from 'graphql-tag';

const newReviewMutation = (gql`
    mutation newReviewMutation($user_id: ID!, $artist_id: ID!, $body: String!, $score: Float!, $generosity: Float!, $technics: Float!, $ambiant: Float!, $media: String) {
        newReview(input: {
            user_id: $user_id,
            artist_id: $artist_id,
            body: $body,
            score: $score,
            generosity: $generosity,
            technics: $technics,
            ambiant: $ambiant,
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
                generosity
                technics
                ambiant
                media
            }
            
        }
    }
`);

export default newReviewMutation