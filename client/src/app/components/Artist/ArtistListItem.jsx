import React from 'react';
import Paper from 'material-ui/Paper';

const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect

	const paperStyle = {
	  display: 'grid',
	  marginBottom: 20,
	  padding: 20,
	};

	const textStyle = {
		gridColumn: 1,
		textAlign: 'left',
	}

	const noteStyle = {
		gridColumn: 2,
  	    textAlign: 'right',
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