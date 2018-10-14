import gql from 'graphql-tag';

const artistSearchQuery = (gql`
    query artistSearchQuery($input: String, $first: Int, $skip: Int) {
      allArtists(filter: {description_contains: $input OR: {name_contains: $input}}, first: $first, skip: $skip) {
          id
          name
          description
          score
      }
    }
`);

export default artistSearchQuery;