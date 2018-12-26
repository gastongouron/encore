import gql from 'graphql-tag';

const artistHomeQuery = (gql`
    query artistHomeQuery {
	    artistsHome {
	        id
	        name
			description_en
			description_fr
			tags
			cover_url
			score
			reviews_count
	    }
    }
`);

export default artistHomeQuery