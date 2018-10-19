import gql from 'graphql-tag';

const updateUserMutation = (gql`
    mutation updateUserMutation($user_id: ID!, $locale: String!) {
        editUser(input: {
            id: $user_id,
            locale: $locale,
        })
        {
            user{
                locale
                first_name
                last_name
                display_name
                profile_picture
                email                
            }
        }
    }
`);

export default updateUserMutation