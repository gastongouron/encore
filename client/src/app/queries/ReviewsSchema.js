import gql from 'graphql-tag';

const artistDetailQuery = (gql`
    query artistDetailQuery($id: ID!) {
	    artist(id: $id) {
	        id
	        name
			description
			reviews {
				id
				body
				user_id
			}
	    }
    }
`);

export default artistDetailQuery