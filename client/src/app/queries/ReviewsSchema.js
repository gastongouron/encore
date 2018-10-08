import gql from 'graphql-tag';

const artistDetailQuery = (gql`
    query artistDetailQuery($id: ID!) {
	    artist(id: $id) {
	        id
	        name
			description
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

export default artistDetailQuery