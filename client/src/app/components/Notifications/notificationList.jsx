import React, { Component } from "react";
import NotificationItem from './notificationListItem'
import _ from 'underscore'
import { connect } from "react-redux";
import { withApollo } from 'react-apollo'
import Paper from 'material-ui/Paper'
// import InfiniteScroll from "react-infinite-scroll-component";

const paperStyle = {
  // display: "flex",
  textAlign: 'center',
  margin: 2,
  marginBottom: 20,
  minWidth: '100%',
  padding: 20,
  paddingTop: 40,
  paddingBottom: 40,
};


class NotificationsList extends Component {

  render() {

    const notifications = this.props.notifications
    console.log(notifications.length)

    return (
      <div>

           {notifications.length > 0 ? notifications.map((notification, index) => (
      			  <NotificationItem
      			  	key={index}
      			  	notification={notification} 
      			  />
            )) : 
            <Paper style={paperStyle} zDepth={1} rounded={true} >
              <h2>{ this.props.locales.locales.noNotifications}</h2><br/>
              <p>{ this.props.locales.locales.noNotificationsP1}</p>
           </Paper>}
      </div>
    );
  }

}  


const mapStateToProps = state => {
    return { 
        locales: state.locales,
    };
};

export default withApollo(connect(mapStateToProps, null)(NotificationsList));

