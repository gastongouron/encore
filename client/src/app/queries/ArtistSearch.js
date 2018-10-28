import gql from 'graphql-tag';

const artistSearchQuery = (gql`
    query artistSearchQuery($input: String, $first: Int, $skip: Int) {
      allArtists(filter: {description_contains: $input OR: {name_contains: $input}}, first: $first, skip: $skip) {
          id
          name
          description_en
          description_fr
          score
          avatar_url
          profile_picture_url
          cover_url
          reviews_count
          tags
      }
    }
`);

export default artistSearchQuery;