import React from 'react';
import ArtistItem from './ArtistListItem'

const Artist = (props) => {

	const artistItems = props.artists.map((artist, index) => {

		return (
			<ArtistItem 
				onArtistSelect={props.onArtistSelect}
				key={index}
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