import gql from 'graphql-tag';

const artistDetailQuery = (gql`
    query artistDetailQuery($id: ID!) {
	    artist(id: $id) {
	        id
	        name
			description_en
			description_fr
			tags
			cover_url
			score
			reviews_count
			reviews {
				artist_id
                artist_name
                author_display_name
                author_profile_picture
				body
				total
                score
                generosity
                technics
                ambiant
                media
                user_id
                created_at
                updated_at
                id
			}
	    }
    }
`);

export default artistDetailQuery