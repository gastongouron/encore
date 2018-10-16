import gql from 'graphql-tag';

const artistDetailQuery = (gql`
    query artistDetailQuery($id: ID!) {
	    artist(id: $id) {
	        id
	        name
			description
			tags
			cover_url
			score
			reviews {
				artist_id
                artist_name
                author_display_name
                author_profile_picture
				body
                score
                user_id
                id
			}
	    }
    }
`);

export default artistDetailQuery