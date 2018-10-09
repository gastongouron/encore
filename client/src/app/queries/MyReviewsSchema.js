import gql from 'graphql-tag';

const myReveiwsQuery = (gql`
    query myReveiwsQuery($id: ID!) {
	    user(id: $id) {
            email
	        first_name
            last_name
            id
			reviews {
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

export default myReveiwsQuery