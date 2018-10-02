// import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
// import gql from 'graphql-tag';
// import graphql from 'react-apollo';
// import update from 'immutability-helper';

// class NewArtist extends Component {
//     constructor(){
//         super();
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         let title = this.refs.title.value;
//         if(title === '') {
//             alert("You must enter title!");
//             return;
//         }
//         let name = this.refs.name.value;
//         let description = this.refs.description.value;

//         let variables = {
//             name: name,
//             description: description,
//         }

//         this.props.submit({
//             variables: variables
//         })
//         .then(({ data }) => {
//             browserHistory.push('/artists');
//         }).catch((error) => {
//             console.log('There was an error sending the query', error);
//         });
//     }

//     render() {
//         return (
//             <div className="row" style={{margin: "20px"}}>
//                 <div className="col-md-3">
//                     <h2>New Artist</h2>
//                     <form onSubmit={this.handleSubmit.bind(this)}>
//                         <div className="formGroup">
//                             <label>Name</label>
//                             <input className="form-control" type="text" ref="name" />
//                         </div>
//                         <div className="formGroup">
//                             <label>Description</label>
//                             <input className="form-control" type="text" ref="description" />
//                         </div>
//                         <br/>
//                         <button className="btn btn-default" type='submit'>Submit</button>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// const newArtistMutation = gql`
//     mutation newArtist($name: String!, 
//                         $description: String){
//                                 newArtist(input: 
//                                     {
//                                         name: $name, 
//                                         description: $description
//                                     }
//                                 )
//                                 {
//                                     artist {
//                                         id 
//                                         name 
//                                         description
//                                     }
//                                 }
//                         }
// `;


// const NewArtistWithData = graphql(newArtistMutation,{
//     props({ mutate }) {
//         return {
//            submit({ variables }) {
//                return mutate({
//                    variables: variables,
//                    optimisticResponse: {
//                        __typename: 'Mutation',
//                        newArtist: {
//                            __typename: 'Artist',
//                            name: variables.name,
//                            description: variables.description
//                        }
//                    },
//                    updateQueries: {
//                        MovieListQuery: (previousResult, { mutationResult }) => {
//                            const newArtist = mutationResult.data.newArtist;
//                            return update(previousResult, {
//                                artists: {
//                                    $unshift: [newArtist]
//                                }
//                            });
//                        }
//                    }
//                });
//            }
//         };
//     }
// }
// )(NewArtist);
// export default NewArtistWithData;