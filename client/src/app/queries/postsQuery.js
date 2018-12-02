import gql from 'graphql-tag';

const postsQuery = (gql`
    query postsQuery {
      posts {
          id
          title
          body
          created_at
          author
      }
    }
`);

export default postsQuery;