import { gql } from 'react-apollo';
// import { Query } from 'react-apollo';

const artistListQuery = gql`
    query {
	    artists {
	        id
	        name
	        description     
	    }
    }
`;

export default artistListQuery;