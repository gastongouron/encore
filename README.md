## Setup
Steps to set up after cloning the repo locally.

```bash
gem install bundler
bundle
rails db:setup
# Create .env file with devise token secret
rails secret | (read secret; echo DEVISE_JWT_SECRET_KEY="$secret" > .env)
# Install client dependencies
(cd client && yarn)
# Run the app from app directory
Rake start 
```

### A Note About Ports

The api and the website will run on different ports. The port specified in the ```.foreman``` file will be used for the api, and the website will run on that port +100. To get the website to access the api on it's own domain, we have added the following to ```./client/package.json```.


```json
"proxy": "http://localhost:[the same port in the .foreman file]"
```

If you want to change the ports locally, change both ```.foreman``` and ```./client/package.json``` to the same port.

### A Note GraphQL

In development mode, the api will serve a special route `localhost:3001/graphiql` to allow you interract with graphiql visual playground.

## Comments

1. This app uses some bits that are not necessary for `react-devise` to function:
  * [create-react-app](https://github.com/facebookincubator/create-react-app)
  * [react-router-redux](https://github.com/reactjs/react-router-redux)
  * [redux-persist](https://github.com/rt2zz/redux-persist)
  * [material-ui](http://www.material-ui.com)
  * [graphql](http://graphql.org/)
  * [apollo](http://dev.apollodata.com/)
  * [styled-components](https://github.com/styled-components/styled-components)

