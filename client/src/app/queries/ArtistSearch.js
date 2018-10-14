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


// const QUERY_ARTISTS = gql`
// query ($q: String!, $end: String) {
//   search(first: 20, type: ARTIST, query: $q, after: $end) {
//     nodes {
//       ... on Repository {
//         name
//         url
//       }
//     }
//     pageInfo {
//       endCursor
//       hasNextPage
//     }
//   }
// }
// `;

// query {
//   allArtists(filter: {description_contains:"lorem" OR: {name_contains: "Kate"}}){
//     name
//     description
//   }
// }
