import React from 'react';
import ArtistItem from './ArtistListItem'

const Artist = (props) => {

	const artistItems = props.artists.map((artist) => {

		return (
			<ArtistItem 
				onArtistSelect={props.onArtistSelect}
				key={artist.name}
				artist={artist} 
			/>
		) 
	})

	return (
		<div>
			{artistItems}
		</div>
	)
}

export default Artist;