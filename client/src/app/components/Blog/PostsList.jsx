import React, { Component } from "react";
import PostItem from './PostListItem'
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom'

class PostList extends Component {

  render() {
    console.log(this.props.posts)
    return (
      <div>
        <List>
           {this.props.posts.map((post, index) => (
                <PostItem 
                  key={index}
                  post={post} 
                />
            ))}
        </List>
      </div>
    );
  }

}  
export default PostList
