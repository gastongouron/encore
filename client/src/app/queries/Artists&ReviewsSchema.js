import gql from 'graphql-tag';

const artist_reviewListQuery = (gql`
    query artist_reviewListQuery {
	    artists {
	        name
            description
            reviews {
                body
                score
            }    
	    }
    }
`);

export default artist_reviewListQuery;