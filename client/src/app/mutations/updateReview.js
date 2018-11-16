import gql from 'graphql-tag';

const updateMutation = (gql`
    mutation updateMutation($id: ID!, $body: String!, $score: Float!, $generosity: Float!, $technics: Float!, $ambiant: Float!, $media: String) {
        editReview(input: {
            id: $id,
            body: $body,
            score: $score,
            generosity: $generosity,
            technics: $technics,
            ambiant: $ambiant,
            media: $media
        })
        {
            review{
                artist_id
                artist_name
                author_display_name
                author_profile_picture
                artist_profile_picture
				body
                total
                score
                generosity
                technics
                ambiant
                media
                user_id
                id
            }
        }
    }
`);

export default updateMutation