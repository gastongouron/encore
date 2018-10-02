import gql from 'graphql-tag';
// import {history, apolloClient} from '../app/setup';

// import { Query } from 'react-apollo';

// const { artistListQuery } = apolloClient.readQuery({
//   query: gql`
//     query artistListQuery {
// 	    artists_test {
// 	        id
// 	        name
// 	        description     
// 	    }
//     }
//   `,
// });

const artistListQuery = gql`
    query artistListQuery {
	    artists {
	        id
	        name
	        description     
	    }
    }
`;

export default artistListQuery;