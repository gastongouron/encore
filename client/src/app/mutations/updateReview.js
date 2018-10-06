import gql from 'graphql-tag';

const updateMutation = (gql`
    mutation updateMutation($id: ID!, $body: String!) {
        editReview(input: {
            id: $id,
            body: $body
        })
        {
            review{
                id
                user_id
                body
            }
        }
    }
`);

export default updateMutation