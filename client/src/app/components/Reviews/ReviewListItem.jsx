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
	    maxHeight: 200,
	}

	const body = {
		padding: 20,
		paddingTop: 20,
		paddingBottom: 20,
	}

	const paperStyle = { marginBottom: 20 };
	// const right = { float: 'right', clear: 'none'}

    const label = {
      fontSize: 12,
    }

	const rootz = {
	  flexGrow: 1,
	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={true}>
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

				<Divider />

				<div>
					{
						review.media ? 
							isImage(review.media) ? <img alt="" style={imageStyle} src={review.media} /> : <ReactPlayer width='100%' height='auto' url={review.media} controls={true} />
					:
						null
					}
				</div>

				<div >
					<div style={body}>
						<p>{review.body}</p>
					</div>
					<Divider />
					<div style={body}>
						<div style={rootz}>
							<Grid container spacing={16}>

								<Grid item xs={12} sm={6} md={3}>
									<Grid container>
										<Grid style={label} item xs={3} sm={3} md={5}>
											{props.locales.locales.performance}	
										</Grid> 
										<Grid item xs={9} sm={9} md={7}>
											<LinearProgress style={{marginTop: 8}} mode="determinate" value={review.score * 20} />
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} sm={6} md={3}>
									<Grid container>
										<Grid style={label} item xs={3} sm={3} md={5}>
											{props.locales.locales.generosity}	
										</Grid> 
										<Grid item xs={9} sm={9} md={7}>
											<LinearProgress style={{marginTop: 8}} mode="determinate" value={review.generosity * 20} />
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} sm={6} md={3}>
									<Grid container>
										<Grid style={label} item xs={3} sm={3} md={5}>
											{props.locales.locales.technics}	
										</Grid> 
										<Grid item xs={9} sm={9} md={7}>
											<LinearProgress style={{marginTop: 8}} mode="determinate" value={review.technics * 20} />
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} sm={6} md={3}>
									<Grid container>
										<Grid style={label} item xs={3} sm={3} md={5}>
											{props.locales.locales.ambiant}	
										</Grid> 
										<Grid item xs={9} sm={9} md={7}>
											<LinearProgress style={{marginTop: 8}} mode="determinate" value={review.ambiant * 20} />
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


			</Paper>
		)

}

const mapStateToProps = state => {
    return { 
        locales: state.locales
    };
};

export default connect(mapStateToProps, null)(ReviewListItem);
