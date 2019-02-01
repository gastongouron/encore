import { connect } from 'react-redux' 
import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import isImage from 'is-image-filename'
import ReactPlayer from 'react-player'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
// import theme from '../../theme'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentEdit from 'material-ui/svg-icons/image/edit';
import Grid from '@material-ui/core/Grid'
import LinearProgress from 'material-ui/LinearProgress';
import theme from '../../theme'
import Star from 'material-ui/svg-icons/toggle/star';
import StarRatings from 'react-star-ratings';
import MobileTearSheet from './MobileTearSheet';

const ReviewListItem = (props) => {


	const review = props.review
	const onReviewSelect = props.onReviewSelect
	const belongsToUser = props.belongsToUser
	const onUserProfile = props.match.includes('user')
	const formatter = buildFormatter(frenchStrings)

	const imageStyle = {
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    width: '100%',
	    height: '100%',
	    maxHeight: 400,
	}

	const body = {
		padding: 20,
		paddingTop: 15,
		paddingBottom: 20,
	}

	const footer = {
		padding: 20,
		paddingTop: 15,
		paddingBottom: 20,
	}

	const paperStyle = { marginBottom: 10 };
	// const right = { float: 'right', clear: 'none'}

    const label = {
      fontSize: 10,
    }

	const rootz = {
	  flexGrow: 1,
	}

	return (
<MobileTearSheet height={'100%'}>
				<div>
				</div>


				<div>
					<div style={{minWidth:'100%'}}>
					<ListItem key={review.id} innerDivStyle={{ textDecoration: 'none', padding: 0, margin: 0}}>
						<Link to={onUserProfile ? '/artists/'+ review.artist_id : '/user/'+ review.user_id}  style={{ textDecoration: 'none' }}>
				      <ListItem
				          primaryText={onUserProfile ? review.artist_name : review.author_display_name}
				          secondaryText={review.created_at !== undefined ?
							<span style={{color: 'grey', fontSize: '0.77em'}}>
								{ review.created_at === review.updated_at ? props.locales.locales.created_at : props.locales.locales.updated_at}
								<TimeAgo date={review.created_at === review.updated_at ? review.created_at : review.updated_at} formatter={props.locales.locales._language === 'en' ? undefined : formatter}/>
							</span>
						  : 
							<span style={{color: 'grey', fontSize: '0.77em'}}>
								{props.locales.locales.justNow}
							</span>
				          }
				          rightIcon={
				          		<div style={{display: 'flex', minWidth: '50px', color: theme.palette.textColor}}>
					          		<Star color={theme.palette.starColor} viewBox="-4 2 31 31"/>
					          		<b>{review.total}</b>
				          		</div>
				          }
				          leftAvatar={<Avatar src={onUserProfile ? review.artist_profile_picture : review.author_profile_picture} />}/>
				         </Link>
				       </ListItem>
					</div>
				</div>
				<Divider/>

				<div >
					<div style={body}>
						<p>{review.body}</p>
					</div>

				<div>
					{
						review.media ? 
							isImage(review.media) ? <img alt="" style={imageStyle} src={review.media} /> : <ReactPlayer width='100%' height='auto' url={review.media} controls={true} />
					:
						<Divider/>
					}
				</div>
					<div style={footer}>
						<div style={rootz}>
							<Grid container spacing={16}>

								<Grid item xs={6} sm={3} md={3}>
									<Grid container>
										<Grid style={label} item xs={6} sm={12} md={12}>
											{props.locales.locales.performance}	
										</Grid> 
										<Grid item xs={6} sm={12} md={12}>
									      <StarRatings
									          starRatedColor="red"
									          numberOfStars={5}
									          name='rating'
									        rating={review.score}
									        starDimension="10px"
									        starSpacing="1px"
									      />
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={6} sm={3} md={3}>
									<Grid container>
										<Grid style={label} item xs={6} sm={12} md={12}>
											{props.locales.locales.generosity}	
										</Grid> 
										<Grid item xs={6} sm={12} md={12}>
									      <StarRatings
									          starRatedColor="red"
									          numberOfStars={5}
									          name='rating'
									        rating={review.generosity}
									        starDimension="10px"
									        starSpacing="1px"
									      />
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={6} sm={3} md={3}>
									<Grid container>
										<Grid style={label} item xs={6} sm={12} md={12}>
											{props.locales.locales.technics}	
										</Grid> 
										<Grid item xs={6} sm={12} md={12}>
									      <StarRatings
									          starRatedColor="red"
									          numberOfStars={5}
									          name='rating'
									        rating={review.technics}
									        starDimension="10px"
									        starSpacing="1px"
									      />
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={6} sm={3} md={3}>
									<Grid container>
										<Grid style={label} item xs={6} sm={12} md={12}>
											{props.locales.locales.ambiant}	
										</Grid> 
										<Grid item xs={6} sm={12} md={12}>
									      <StarRatings
									          starRatedColor="red"
									          numberOfStars={5}
									          name='rating'
									        rating={review.ambiant}
									        starDimension="10px"
									        starSpacing="1px"
									      />

										</Grid>
									</Grid>
								</Grid>

			                    { belongsToUser && onUserProfile ? 
									<Grid item xs={12}>
										<RaisedButton 
											style={{float: 'right'}}
											onClick={ () => onReviewSelect(review) }
											default={true}
											label={props.locales.locales.edit}/> 
									</Grid>
			                    : 
			                    	null
			                   	}
							</Grid>

						</div>
					</div>
				</div>


			</MobileTearSheet>
		)

}

const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(ReviewListItem);
