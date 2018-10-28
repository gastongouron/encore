import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router-dom'
import Taglist from './Taglist'
import Grid from '@material-ui/core/Grid'
import Divider from 'material-ui/Divider';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';
import theme from '../../theme'

const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect
	const onClickTag = props.onClickTag
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
      margin: 2,
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
				rounded={true} >
				<div style={rootz}>
					<Grid container>

				        <Grid item xs={12} sm={4} md={3} onClick={ () => onArtistSelect(artist) }>
							<img alt="todo" style={imageStyle} src={artist.cover_url}></img>
				        </Grid>

				        <Grid item xs={12} sm={8} md={9}>
							<Grid style={padded} container onClick={ () => onArtistSelect(artist) }>
					        	<Grid style={floatLeft} item xs={9}>
					        		<h1>
						        		<Link style={{color: theme.palette.primary1Color}} to={'/artists/'+ artist.id}>
						        			{artist.name}
					        			</Link>
					        		</h1>
					        		<span><b>
					        		{
					        			Number(artist.reviews_count) > 1 
					        		? 
					        			artist.reviews_count + " " + props.locales.locales.reviewsLabel 
					        		: 
					        			Number(artist.reviews_count) === 1 ? artist.reviews_count + " " + props.locales.locales.reviewLabel : props.locales.locales.beTheFirst
					        		}
					        		</b></span>

					        	</Grid>

					        	<Grid item xs={3}>
					        		<h1 style={floatRight}>{ Number(artist.reviews_count) != 0 ? (Math.round( artist.score * 10 ) / 10) : ""}</h1>
					        	</Grid>
					        </Grid>
					        <Divider />
							<Grid style={padded} container >
								<Grid style={floatLeft} item xs={12}>


							<Truncate lines={4} ellipsis={<span>... <Link style={{color: theme.palette.primary1Color}} to={'/artists/'+ artist.id}>{props.locales.locales.readMore}</Link></span>}>
								{props.locales.locales._language === 'en' ? artist.description_en : artist.description_fr}
            				</Truncate>


									</Grid>
							</Grid>
							<Divider />
							<Grid style={padded} container>
								<Grid item xs={12}>
									<Taglist 
										onClickTag={onClickTag}
										tags={tags} />
									
						        </Grid>
						    </Grid>

						</Grid>


				    </Grid>
				</div>

			</Paper>
		)

}




const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default connect(mapStateToProps, null)(ArtistListItem)