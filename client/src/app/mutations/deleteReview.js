import gql from 'graphql-tag';

const deleteMutation = (gql`
    mutation deleteMutation($id: ID!) {
        deleteReview(input: {
            id: $id
        }){
            id
        }
    }
`);

export default deleteMutation