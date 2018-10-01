import { gql } from 'react-apollo';
// import { Query } from 'react-apollo';

const artistListQuery = gql`
    query artistListQuery {
	    artists_test {
	        id
	        name
	        description     
	    }
    }
`;

export default artistListQuery;