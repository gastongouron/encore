import React from 'react';
import Paper from 'material-ui/Paper';

// const ArtistListItem = ({artist}) => {
const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect
	// const imageUrl = artist.snippet.thumbnails.default.url;

	const style = {
	  // height: 100,
	  // flex:1,
	  // width: 100,
	  marginBottom: 20,
	  padding: 20,
	  textAlign: 'left',
	  // display: 'inline-block',
	};

	return (
		<Paper
			Paper
			style={style} zDepth={1} 
			rounded={false} 
			onClick={ () => onArtistSelect(artist) } 
			className="">
			<div>
				{artist.name}
			</div>
			<br />
			<div>
				{artist.description}
			</div>
		</Paper>
		)

}

export default ArtistListItem;