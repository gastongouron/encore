import React, { Component } from 'react';
import { connect } from "react-redux";
// import {graphql} from 'react-apollo';
import  { withApollo } from 'react-apollo'
import SmartDataTable from 'react-smart-data-table'
import artistListQuery from '../queries/ArtistSchema'
import {initArtists, loadingArtists, failedArtists, setArtists} from '../actions/artists'


const sematicUI = {
    segment: 'ui basic segment',
    message: 'ui message',
    input: 'ui icon input',
    searchIcon: 'search icon',
    table: 'ui compact selectable table',
    select: 'ui dropdown',
    refresh: 'ui labeled primary icon button',
    refreshIcon: 'sync alternate icon',
    change: 'ui labeled secondary icon button',
    changeIcon: 'exchange icon',
    checkbox: 'ui toggle checkbox',
    loader: 'ui active text loader',
    deleteIcon: 'trash red icon',
  }


class Artists extends Component {
    constructor(props){
        console.log("Artists", props)
        super(props);

        this.state = {
            useApi: false,
            apiData: '',
            apiIdx: -1,
            numResults: 10,
            data: [],
            filterValue: '',
            perPage: 0,
            showOnRowClick: true,
          }
          this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

    }

	componentWillMount(){	
        console.log(" componentWillMount ---------", this.props);
        if (this.props.artists.artists.length > 0)
            return;
        this.props.loadingArtists();
        this.props.client.networkInterface.query({query: artistListQuery})
        .then(
            (res) => {
                console.log("componentWillMount componentWillMount", res);
                this.props.setArtists(res.data.artists);
            },
            (err) => {
                console.log("componentWillMount errrr", err);
                this.props.failedArtists(err.data);
            }
        );
    }

    handleCheckboxChange() {
        const { showOnRowClick } = this.state
        this.setState({ showOnRowClick: !showOnRowClick })
    }

    onRowClick = (event, { rowData, rowIndex, tableData }) => {
        const { showOnRowClick } = this.state
        if (showOnRowClick) {
          const { name, description, id } = rowData
          let value = description || name || id
          
          console.log(rowData, tableData[rowIndex])
          this.props.history.push(`/artists/${id}`);
        } else {
          // The following results should be identical
          console.log(rowData, tableData[rowIndex])
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.artists.loading ?
                        <h1>Loading...</h1>
                    :
                        this.props.artists.error ?
                            <h1>Error...</h1>
                        :
                            <div>
                                <h1>Artists</h1>

                                <SmartDataTable
                                    data={this.props.artists.artists}
                                    name='artists-table'
                                    className={sematicUI.table}
                                    sortable
                                    onRowClick={this.onRowClick}
                                    perPage = {10}
                                />
                            </div>
                }
                {/* <Query query={artistListQuery} fetchPolicy='network-only'>
                    {({ loading, error, data }) => {
                    if (loading) return <h1>"Loading..."</h1>;
                    if (error) return <h1>`Error! ${error.message}`</h1>;
                          
                    return (
                        <div>
                            <h1>Artists</h1>

                            <SmartDataTable
                                
                                data={this.props.data.artists}
                                name='artists-table'
                                className={sematicUI.table}
                                sortable
                                onRowClick={this.onRowClick}
                                perPage = {10}
                            />
                        </div>
                    );
                    }}
                </Query> */}
            </div>
        )
    }
}

// export default graphql(artistListQuery)(Artists);

const mapStateToProps = state => {
    return { artists: state.artists };
};

const mapDispatchToProps = dispatch => {
    return {
        initArtists : () => dispatch(initArtists()),
        loadingArtists : () => dispatch(loadingArtists()),
        failedArtists : (message) => dispatch(failedArtists(message)),
        setArtists : (artists) => dispatch(setArtists(artists)),
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Artists) );
