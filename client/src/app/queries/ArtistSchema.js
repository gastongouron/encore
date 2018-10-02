import gql from 'graphql-tag';

const artistListQuery = (gql`
    query artistListQuery {
	    artists_test {
	        id
	        name
	        description     
	    }
    }
`);

export default artistListQuery;