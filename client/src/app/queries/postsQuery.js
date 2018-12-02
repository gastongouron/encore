import gql from 'graphql-tag';

const postsQuery = (gql`
    query postsQuery {
      posts {
          id
          title
          body
          created_at
          image_url
          author
      }
    }
`);

export default postsQuery;