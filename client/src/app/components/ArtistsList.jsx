import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import artistListQuery from '../queries/ArtistSchema';
import { Query } from 'react-apollo';
import SmartDataTable from 'react-smart-data-table'

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
        console.log(props)
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
        console.log(this.props.data.artists)
        return (
            <div>
                <Query query={artistListQuery} fetchPolicy='network-only'>
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
                </Query>
            </div>
        )
    }
}

export default graphql(artistListQuery)(Artists);
