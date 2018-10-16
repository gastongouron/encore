import React from 'react'
import Paper from 'material-ui/Paper'
import StarIcon from 'react-material-icons/icons/toggle/star'
import Taglist from './Taglist'
import Grid from '@material-ui/core/Grid'

const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect
	const tags = artist.tags

	const rootz = {
	  flexGrow: 1,
	}

	const padded = {
	  padding: 20,
	}

	const floatLeft = {
	  float: 'left',
	}

	const floatRight = {
	  float: 'right',
	}

	const paperStyle = {
	  marginBottom: 20,
	};

	const imageStyle = {
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    height: '100%',
	    width: '100%'
	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={false} 
				onClick={ () => onArtistSelect(artist) } >
				<div style={rootz}>
					<Grid container>

				        <Grid item xs={12} sm={3}>
							<img style={imageStyle} src={artist.cover_url}></img>
				        </Grid>

				        <Grid style={padded} item xs={12} sm={9}>

				        	<Grid style={floatLeft} item xs={9}>
				        		<h1>{artist.name}</h1>
				        	</Grid>

				        	<Grid style={floatRight} item xs={3}>
				        		<h1><StarIcon color="#f44336"/>{Math.round( artist.score * 10 ) / 10}</h1>
				        	</Grid>

				        	<br />
				        	<br />
				        	<br />

							<Grid style={floatLeft} item xs={12}>
								<p>{artist.description}</p>
								<Taglist tags={tags}/>
					        </Grid>

						</Grid>


				    </Grid>
				</div>

			</Paper>
		)

}

export default ArtistListItem;