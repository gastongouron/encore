import React from 'react';
import Paper from 'material-ui/Paper';
import StarIcon from 'react-material-icons/icons/toggle/star';

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
					<h1>{artist.name}</h1>
					<br />
					<p>{artist.description}</p>
				</div>
				<div style={noteStyle}>
					<h1>
						<StarIcon color="#f44336"/>
						{Math.round( artist.score * 10 ) / 10}
					</h1>
				</div>
			</Paper>
		)

}

export default ArtistListItem;