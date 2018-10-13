import gql from 'graphql-tag';

const updateMutation = (gql`
    mutation updateMutation($id: ID!, $body: String!, $score: String!) {
        editReview(input: {
            id: $id,
            body: $body,
            score: $score
        })
        {
            review{
                artist_id
                artist_name
                author_display_name
                author_profile_picture
				body
                score
                user_id
                id
            }
        }
    }
`);

export default updateMutation