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
    // console.log(this.props.posts)
    // do grid
    // make first elem 12
    // make others lower
    return (
      <div style={{top: 0, position: 'absolute'}}>
        <List style={{margin: 0, padding: 0}}>
        <div style={rootz}>
          <Grid container>
           {this.props.posts.map((post, index) => (
                index < 1 ? 
                <Grid key={index} item xs={12} sm={12} md={12}>
                <PostMainItem 
                  key={index}
                  post={post} 
                />
                </Grid>
                :
                <Grid key={index} item xs={12} sm={12} md={6}>
                <PostMainItem 
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
