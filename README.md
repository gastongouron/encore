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


## Comments

1. This app uses some bits that are not necessary for `react-devise` to function:
  * [create-react-app](https://github.com/facebookincubator/create-react-app)
  * [react-router-redux](https://github.com/reactjs/react-router-redux)
  * [redux-persist](https://github.com/rt2zz/redux-persist)
  * [material-ui](http://www.material-ui.com)
  * [graphql](http://graphql.org/)
  * [apollo](http://dev.apollodata.com/)
  * [styled-components](https://github.com/styled-components/styled-components)


### A note about rake

bundle exec rake db:drop && rake db:create && rake db:migrate && rake get_data:last_fm_top_list && get_data:last_fm_artist_detail. This projects uses `heroku scheduler`, to access it: `heroku addons:open scheduler`.

### A Note on Administrate

In development mode, the api will serve a special route `localhost:3001/admin` to allow you CRUD all resources of the app.
In production, this route will be served by default to domain.com/admin

### A Note on GraphQL

In development mode, the api will serve a special route `localhost:3001/graphiql` to allow you interract with graphiql visual playground.


## GraphQL queries

### All artists and their reviews bodies

```
query rootQuery {
	artists {
		name
		description
		reviews {
			body
			score
		}
	}
}

```
### All artists (should add limit for pagination?)
```
query rootQuery {
	artists {
		id
		name
		description     
	}
}

```    

### Query to get single artist information

```
query rootQuery {
	artist(id:1) {
		id
		name
		description
	}
}
```

### Query to have single artist info + reviews

```
query rootQuery {
	artist(id:1) {
		id
		name
		description
		reviews {
			body
		}
	}
}

```

### Example artist profile: all reviews and their users for an artist.

```
query rootQuery {
	artist(id:4) {
		description
		reviews {
			body
			score
			user_id
		}
		users {
			id
			first_name
		}
	}
}

```
### To query all reviews (index) (should add limit for pagination?)

```
query rootQuery {
	reviews {
		user_id
		artist_id
		body
	}
}

```
### To query one review by id
```
query rootQuery {
	review(id:41) {
		user_id
		artist_id
		body
	}
}


```
### Example user profile query: user info + all reviews and artists for an user whose id is 4

```
query rootQuery {
	user(id:4) {
		first_name
		last_name
		email
		reviews {
			body
			score
			artist_id
		}
		artists {
			id
			name
			description
		}
	}
}

```
## GraphQL Mutations


### [C]reating new review mutation

```
mutation newReview {
	newReview(input: {
		user_id: 1,
		artist_id: 50,
		body: "nice"   
	}) {
		review {
			artist_id
			user_id
			body
		}
	} 
}
``` 
### [U]pdating an existing review by review id

```
mutation editReview {
	editReview(input: {
		id: 1,
		body: "noice"   
	}) {
		review {
			artist_id
			user_id
			body
		}
	} 
}
``` 
### [D]eleting an existing review mutation

```
mutation deleteReview {
	deleteReview(input: {
		id: 1
	}) {
		id
	}
}

```
###mutation for search bar query
``` 
query {
  allArtists(filter: {description_contains:"lorem" OR: {name_contains: "Kate"}}){
		name
    description
  }
}

```
