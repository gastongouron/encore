import gql from 'graphql-tag';

const artistListQuery = (gql`
    query artistListQuery {
	    artists {
	        id
	        name
	        description     
	    }
    }
`);

export default artistListQuery;