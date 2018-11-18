import React, { Component } from "react";
import NotificationItem from './notificationListItem'
import _ from 'underscore'
// import InfiniteScroll from "react-infinite-scroll-component";

class NotificationsList extends Component {

  render() {

    const notifications = this.props.notifications

    // CREATE FEW DIFFERENT TYPES OF NOTIFICATIOBN ITEMS SUCH AS:
    // FOLLOWS: YOU ARE NOW FOLLOWING ...
    // HAS BEEN FOLLOWED: ... IS NOW FOLLOWING YOU
    // SOMEONE YOU FOLLOW... SHARED AN EXPERIENCE WITH ... ARTIST + LINK
    // SOMEONE YOU FOLLOW... RECOMENDS THIS ARTIST TO YOU 

    // <InfiniteScroll
      // dataLength={this.props.notifications.length}
      // next={this.fetchMoreData}
      // hasMore={this.props.hasMore}
      // loader={<h4 style={{textAlign: 'center', paddingBottom: 10}}>...</h4>}
      // endMessage={
      //     <p style={{textAlign: 'center'}}>
      //       <b></b>
      //     </p>
      //  }>
      //  {notifications.map((notification, index) => (
      //     <NotificationItem
      //       key={index}
      //       notification={notification} 
      //     />
      //   ))}
    // </InfiniteScroll>

    return (
      <div>
           {notifications.map((notification, index) => (
      			  <NotificationItem
      			  	key={index}
      			  	notification={notification} 
      			  />
            ))}

      </div>
    );
  }

}  
export default NotificationsList
