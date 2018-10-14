import gql from 'graphql-tag';

const artistSearchQuery = (gql`
    query artistSearchQuery($input: String!) {
      allArtists(filter: {description_contains: $input OR: {name_contains: $input}}) {
          id
          name
          description
          score
      }
    }
`);

export default artistSearchQuery;