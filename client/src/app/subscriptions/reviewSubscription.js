import gql from 'graphql-tag';

const reviewSubscription = (gql`
    subscription reviewWasAdded($artist_id: ID!) {
    	reviewWasAdded(artist_id: $artist_id) {
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

export default reviewSubscription;
