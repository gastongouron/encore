import gql from 'graphql-tag';

const myReveiwsQuery = (gql`
    query myReveiwsQuery($id: ID!) {
	    user(id: $id) {
	        first_name
            last_name
            email
			reviews {
                artist_id
                artist_name
				body
                score
			}
	    }
    }
`);

export default myReveiwsQuery