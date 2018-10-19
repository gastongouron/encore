import gql from 'graphql-tag';

const artistByTagNameQuery = (gql`
    query artistByTagNameQuery($input: String!) {
      tagged(tag: $input) {
          id
          name
          description_en
          description_fr
          score
          avatar_url
          profile_picture_url
          cover_url
          tags
      }
    }
`);

export default artistByTagNameQuery;