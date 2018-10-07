import React, { Component } from 'react';
import {connect} from "react-redux"
import { withApollo } from 'react-apollo'
import Avatar from 'react-avatar';
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

class Profile extends Component {
    constructor(props){
        console.log("profile page------------------", props)
        super(props);

        this.state = {
           
          }

    }

	componentWillMount(){
        console.log(" profile componentWillMount ---------------", this.props);
        
    }

    render() {
        
        return (
            <div>
                <div className="text-center">
                    <Avatar size="100" round={true} src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"/>
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>Email</div>
                </div>
                <div>
                    {/* <SmartDataTable
                        data={mDate}
                        name='artists-table'
                        dataKey=''
                        className={sematicUI.table}
                        sortable
                        filterValue={filterValue}
                        onRowClick={this.onRowClick}
                        perPage = {10}
                    /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Profile) );