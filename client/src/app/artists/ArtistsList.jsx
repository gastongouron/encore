import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import ArtistItem from './ArtistItem';
import artistListQuery from '../queries/ArtistSchema';
import { Query } from 'react-apollo'

class Artists extends Component {
    // constructor(){
    //     super();
    // }

    render() {
        return (

            <div>
                <Query query={artistListQuery}>
                    {({ loading, error, data }) => {
                          console.log(data)
                          if (loading) return "Loading...";
                          if (error) return `Error! ${error.message}`;
                          const ArtistsItems = this.props.data.artists_test.map((data,i) => {
                            return (<ArtistItem key={i} index={i} data={data}></ArtistItem>);
                          });
                          return (
                            <div>
                                <h1>Artists</h1>
                                <table className="table table-striped table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { ArtistsItems }
                                    </tbody>
                                </table>
                            </div>
                          );
                        }}
                </Query>
            </div>
        )
    }
}

export default graphql(artistListQuery)(Artists);
