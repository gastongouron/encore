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

### A Note on GraphQL

In development mode, the api will serve a special route `localhost:3001/graphiql` to allow you interract with graphiql visual playground.


## GraphQL queries

```

# All artists and their reviews bodies
query artistsListWithReview {
    artists {
	  	description
       	name
		reviews {
           	body
        }
    }
}

# All artists (should add limit for pagination?)
query artistListQuery {
    artists {
        id
        name
        description     
    }
}
    
# Query to get single artist information
query artistQuery {
    artist(id:1) {
		id
   		name
   		description
    }
}

# Query to have single artist info + reviews
query artistQuery {
	artist(id:1) {
		id
   		name
   		description
   		reviews {
        	body
      	}
	}
}

# All reviews query (index) (should add limit for pagination?)
query reviewListQuery {
    reviews {
    	user_id
    	artist_id
		body
    }
}

# all reviews for an user whose id is 4
query rootQuery {
   user_reviews(id:4) {
		first_name
		last_name
	    reviews {
	      	body
			score
	    }
  	}
}


# One review by id (useless?)
query reviewQuery {
    review(id:41) {
        user_id
		artist_id
	    body
    }
}

```
## GraphQL Mutations

```
# mutation for creating new review
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
 
# mutation for editing an existing review by review id
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
 
# mutation for deleting an existing review
mutation deleteReview {
	deleteReview(input: {
		id: 1
    }) {
		 id
	}
}


# mutation for search bar query



``` 

```