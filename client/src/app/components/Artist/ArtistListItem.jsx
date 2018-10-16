import React from 'react';
import Paper from 'material-ui/Paper';
import StarIcon from 'react-material-icons/icons/toggle/star';
import Taglist from './Taglist'

const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect
	const tags = artist.tags


	const root = {
    flexGrow: 1,
	}

	const paperStyle = {
	  display: 'grid',
	  zIndex: 2,
	  marginBottom: 20,
	};

	const inline = {
		display: 'inline'
	}

	const imageStyle = {
		// width: '100%',
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    height: '100%',
	    maxWidth: '100%'
	    // height: 200,
	}

	const gridColumn = {
		gridColumn: 1,
	}

	const textStyle = {
		gridColumn: 2,
		textAlign: 'left',
		float: 'left',
		padding: 20,
	}

	const noteStyle = {
		gridColumn: 3,
  	    textAlign: 'right',
		padding: 20,
	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={false} 
				onClick={ () => onArtistSelect(artist) } >

				<div style={gridColumn}>
					<img style={imageStyle} src={artist.cover_url}></img>
				</div>

				<div style={textStyle}>
					<h1 style={inline}>{artist.name}</h1>
					<br />
					<p>{artist.description}</p>
					<Taglist tags={tags}/>
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