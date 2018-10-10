import React from 'react';

// const ArtistListItem = ({artist}) => {
const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect

	console.log(onArtistSelect)
	// const imageUrl = artist.snippet.thumbnails.default.url;

	return (

		<li 
			onClick={ () => onArtistSelect(artist) } 
			className="list-group-item">
			
			{artist.name}
			{artist.description}
		</li>

		)

}

export default ArtistListItem;