import React, { Component } from 'react';
import {connect} from "react-redux"
import { withApollo } from 'react-apollo'
import Avatar from 'react-avatar';
import SmartDataTable from 'react-smart-data-table'
import myReveiwsQuery from '../../queries/MyReviewsSchema'
import {initReviews, loadingReviews, failedReviews, setReviews} from '../../actions/reviews'

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
        super(props);

        this.state = {
           
          }

    }

	componentWillMount(){
        console.log("profile componentWillMount props---------", this.props);
        if (this.props.reviews.reviews.length > 0)
            return;
        this.props.loadingReviews();
        this.props.client.networkInterface.query({query: myReveiwsQuery, variables: {id: this.props.userInfo.user_id}, fetchPolicy: 'network-only'})
        .then(
            (res) => {
                console.log("profile my reviews componentWillMount query result-----------------", res.data.user.reviews);
                this.props.setReviews(res.data.user.reviews);
            },
            (err) => {
                console.log("profile my reviews componentWillMount query componentWillMount errrr", err);
                this.props.failedReviews(err.data);
            }
        );
        
    }
    getHeaders() {
        return {
          'artist_id': {
            text: 'ART_ID',
          },
          'artist_name': {
            text: 'Artist Name',
          },
          'body': {
            text: 'My review',
          },
        }
      }
    render() {
        console.log("profile render props----^^^^^^^^^^^^^-----", this.props);
        const headers = this.getHeaders()
        return (
            <div>
                <div className="text-center">
                    <Avatar size="100" round={true} src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"/>
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>Email</div>
                </div>
                <div>
                    {
                        this.props.reviews.loading ?
                            <h1>Loading...</h1>
                        :
                            this.props.reviews.error ?
                                <h1>Error...</h1>
                            :
                                <div>
                                    <h1>My reviews</h1>
                                        <SmartDataTable
                                            data={this.props.reviews.reviews}
                                            name='reviews-table'
                                            dataKey=''
                                            className={sematicUI.table}
                                            sortable
                                            headers={headers}
                                            loader={(
                                                <div className={sematicUI.loader}>
                                                  Loading...
                                                </div>
                                              )}
                                            onRowClick={this.onRowClick}
                                            perPage = {10}
                                        />
                                </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { reviews: state.reviews,
            userInfo: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initReviews : () => dispatch(initReviews()),
        loadingReviews : () => dispatch(loadingReviews()),
        failedReviews : (message) => dispatch(failedReviews(message)),
        setReviews : (reviews) => dispatch(setReviews(reviews)),
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Profile) );