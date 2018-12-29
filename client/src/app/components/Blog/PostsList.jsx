import React, { Component } from "react";

import PostItem from './PostListItem'
import PostMainItem from './PostMainItem'

import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'

  const rootz = {
    flexGrow: 1,
  }

class PostList extends Component {

  render() {
    console.log(this.props.posts)
    // do grid
    // make first elem 12
    // make others lower
    return (
      <div>
        <List>
        <div style={rootz}>
          <Grid container spacing={16}>
           {this.props.posts.map((post, index) => (
                index < 1 ? 
                <Grid item xs={12} sm={12} md={12}>
                <PostMainItem 
                  key={index}
                  post={post} 
                />
                </Grid>
                :
                <Grid item xs={12} sm={6} md={6}>
                <PostItem 
                  key={index}
                  post={post} 
                />
                </Grid>
                

            ))}
            </Grid>
        </div>
        </List>
      </div>
    );
  }

}  
export default PostList
