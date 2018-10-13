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
				body
                score
                user_id
                id
            }
        }
    }
`);

export default updateMutation