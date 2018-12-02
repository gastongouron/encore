import React, { Component } from "react";
import PostItem from './PostListItem'

class PostList extends Component {

  render() {
    console.log(this.props.posts)
    return (
      <div>
           {this.props.posts.map((post, index) => (
      			  <PostItem 
      			  	key={index}
      			  	post={post} 
      			  />
            ))}
      </div>
    );
  }

}  
export default PostList
