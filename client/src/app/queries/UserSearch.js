import gql from 'graphql-tag';

const userSearchQuery = (gql`
    query userSearchQuery($input: String, $first: Int, $skip: Int) {
      allUsers(filter: {first_name_contains: $input OR: {last_name_contains: $input}}, first: $first, skip: $skip) {
          id
          first_name
          last_name
          display_name
          profile_picture
          reviews {
          	id
          }
          followers {
          	id
          }
      }
    }
`);

export default userSearchQuery;