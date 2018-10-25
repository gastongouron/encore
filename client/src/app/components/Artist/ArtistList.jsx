import React, { Component } from "react";
import ArtistItem from './ArtistListItem'
import InfiniteScroll from "react-infinite-scroll-component";

class Artist extends Component {

    // constructor(props){
    //     super(props);
    // }

  	fetchMoreData = () => {
  	    this.props.onFetch(20, this.props.artists.length)      	
  	};

  render() {
    return (
      <div>
        <InfiniteScroll
          dataLength={this.props.artists.length}
          next={this.fetchMoreData}
          hasMore={this.props.hasMore}
          loader={<h4>Loading...</h4>}
		      endMessage={
		          <p style={{textAlign: 'center'}}>
		            <b></b>
		          </p>
		       }>
           {this.props.artists.map((artist, index) => (
      			  <ArtistItem 
                onClickTag={this.props.onClickTag}
      			  	onArtistSelect={this.props.onArtistSelect}
      			  	key={index}
      			  	artist={artist} 
      			  />
            ))}
        </InfiniteScroll>
      </div>
    );
  }

}  
export default Artist
