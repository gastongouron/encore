import React from 'react';
import Paper from 'material-ui/Paper';

// const ArtistListItem = ({artist}) => {
const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect
	// const imageUrl = artist.snippet.thumbnails.default.url;

	const paperStyle = {
	  display: 'grid',
	  marginBottom: 20,
	  padding: 20,
	  // position: 'relative',
	};


	const textStyle = {
		gridColumn: 1,
		textAlign: 'left',
	    // position: absolute,
	    // right: 0,
	}

	const noteStyle = {
		gridColumn: 2,
  	    textAlign: 'right',
	    // position: absolute,
	    // right: 0,
	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={false} 
				onClick={ () => onArtistSelect(artist) } 
				className="">
				<div style={textStyle}>
					<b>{artist.name}</b>
					<br />
					{artist.description}
				</div>
				<div style={noteStyle}>
					{artist.score}
				</div>
			</Paper>
		)

}

export default ArtistListItem;