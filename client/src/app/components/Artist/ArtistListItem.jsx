import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router-dom'
import Taglist from './Taglist'
import Grid from '@material-ui/core/Grid'
import Divider from 'material-ui/Divider';
import Truncate from 'react-truncate';
import theme from '../../theme'
import Star from 'material-ui/svg-icons/toggle/star';

const ArtistListItem = (props) => {

	const artist = props.artist
	const onArtistSelect = props.onArtistSelect
	const onClickTag = props.onClickTag
	const tags = artist.tags

	const rootz = {
	  flexGrow: 1,
	  marginBottom: 10,
	}

	const padded = {
	  padding: 15,
	  paddingLeft: 0,
	}

	const tagsContainer = {
	  // padding: 10,
	  borderTop: '1px solid #DAD9D9',
	  paddingTop: 10,
	  paddingLeft: 10,
	  paddingRight: 10,
	  paddingBottom: 10,
	}

	const floatLeft = {
	  float: 'left',
	}

	const floatRight = {
	  float: 'right',
	  color: theme.palette.textColor,
	}

	const paperStyle = {
      // margin: 2,
	  marginBottom:10,
	};

	const imageStyle = {
		padding: 10,
		paddingRight: 10,
		borderRadius: '50%',
		
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    height: '100%',
	    width: '100%',
		height: 'auto',
	}

	const val = window.innerWidth < 400 ? 1 : 2

	return (

				<div style={rootz}>
					<Grid container style={{border: '1px solid #DAD9D9'}}>
				        <Grid item xs={4} sm={3} md={3} onClick={ () => onArtistSelect(artist) }>
							<img alt="sorry :'(" style={imageStyle} src={artist.cover_url}></img>
				        </Grid>

				        <Grid item xs={8} sm={9} md={9}>
							<Grid style={padded} container onClick={ () => onArtistSelect(artist) }>
					        	<Grid style={floatLeft} item xs={8} sm={9}>
					        		<h3>
						        		<Link style={{color: theme.palette.textColor}} to={'/artists/'+ artist.id}>
						        			{artist.name}
					        			</Link>
					        		</h3>
					        	</Grid>

					        	<Grid item style={floatRight} xs={4} sm={3}>
					        		<h3 style={{marginTop: -5, float: 'right'}}>
					        			<span>
					        			{ Number(artist.reviews_count) !== 0 ? (Math.round( artist.score * 10 ) / 10) : ""}
										{ Number(artist.reviews_count) !== 0 ? 
											<Star color={theme.palette.starColor} viewBox="0 -10 30 30"/>
										:
											null
										}
										</span>
					        		</h3>
					        	</Grid>

								<Grid style={floatLeft} item xs={12}>
					        		<span style={{color: theme.palette.disabledColor }}><b>
					        		{
					        			Number(artist.reviews_count) > 1 
					        		? 
					        			artist.reviews_count + " " + props.locales.locales.reviewsLabel 
					        		: 
					        			Number(artist.reviews_count) === 1 ? artist.reviews_count + " " + props.locales.locales.reviewLabel : props.locales.locales.beTheFirst
					        		}
					        		</b></span><br/>

									<Truncate style={{fontSize: 12, lineHeight: 1}} lines={val} ellipsis={<span>... <Link style={{color: theme.palette.primary1Color}} to={'/artists/'+ artist.id}>{props.locales.locales.readMore}</Link></span>}>
										{props.locales.locales._language === 'en' ? artist.description_en : artist.description_fr}
		            				</Truncate>


									</Grid>
							</Grid>
						</Grid>

							<Grid style={tagsContainer} container>
								<Grid item xs={12}>
									<Taglist 
										onClickTag={onClickTag}
										tags={tags} />
						        </Grid>
						    </Grid>


				    </Grid>
				    <Divider/>
				</div>



		)

}




const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default connect(mapStateToProps, null)(ArtistListItem)