import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import ArtistItem from './ArtistItem';
import artistListQuery from '../queries/ArtistSchema';
import { Query } from 'react-apollo'


class Artists extends Component {

    constructor(props){
        console.log(props)
        super(props);
    }

    render() {
        console.log(this.props.data.artists)
        return (
            <div>
                <Query query={artistListQuery}>
                    {({ loading, error, data }) => {
                      if (loading) return <h1>"Loading..."</h1>;
                      if (error) return <h1>`Error! ${error.message}`</h1>;
                      const ArtistsItems = this.props.data.artists.map((data,i) => {
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
