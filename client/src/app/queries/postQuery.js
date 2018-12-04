import gql from 'graphql-tag';

const postQuery = (gql`
    query postQuery($id: ID!) {
      postDetail(id: $id) {
          id
          title
          body
          created_at
          image_url
          author
      }
    }
`);

export default postQuery;