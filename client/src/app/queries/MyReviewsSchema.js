import gql from 'graphql-tag';

const myReveiwsQuery = (gql`
    query myReveiwsQuery($id: ID!) {
	    user(id: $id) {
	        first_name
            last_name
            email
			reviews {
				body
                score
                artist_id
                artist_name
			}
	    }
    }
`);

export default myReveiwsQuery