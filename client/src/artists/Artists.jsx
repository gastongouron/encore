// const ArtistsQuery = gql`{artistz}`;

// const Artists = ({data: {loading, artistz}}) => {

//   return (
//     <div>
//       <div>
//         <ViewHeading>Artists</ViewHeading>
//         <p>{artistz}</p>
//       </div>
//     </div>
//   );
// };

// export default graphql(ArtistsQuery)(muiThemeable()(Artists));


// import {ViewHeading} from '../shared';
// import gql from 'graphql-tag';
// import muiThemeable from 'material-ui/styles/muiThemeable';

import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import Artist from './Artist';
import artistListQuery from './ArtistSchema';
import { Query } from 'react-apollo'

class Artists extends Component {

    render() {
        if(this.props.data.loading) {
            return (<p>Loading</p>)
        } else {
            const ArtistsItems = this.props.data.artists_test.map((data,i) => {
                return (<Artist key={i} index={i} data={data}></Artist>);
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
        }
    }
}

export default graphql(artistListQuery)(Artists);
