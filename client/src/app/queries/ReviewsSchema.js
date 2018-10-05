import gql from 'graphql-tag';

const reviewListQuery = (gql`
    query reviewListQuery($id: ID!) {
	    artist(id: $id) {
	        id
	        name
			description
			reviews {
				body
			}
	    }
    }
`);

export default reviewListQuery