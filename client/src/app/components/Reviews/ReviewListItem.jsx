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
import theme from '../../theme'

const ReviewListItem = (props) => {

	const userId = props.userId
	const review = props.review
	const onReviewSelect = props.onReviewSelect
	const belongsToUser = (Number(userId) === Number(review.user_id))
	const onUserProfile = props.match.includes('user')
	const formatter = buildFormatter(frenchStrings)


	const style = {
	    objectFit: 'cover',
	    width: 26,
	    height: 26,
	    borderRadius: 13,
	    marginRight: 6,
		float: 'left',
		displat: 'block'
	}

	const paperStyle = {
	  marginBottom: 20,
	  // padding: 20,
	};

	const padded = {
	  padding: 20,
	  paddingTop: 0,
	  // marginTop: -20,
	  right: 0,
	  witht: '100%',
	  // float: 'right',
	  display: 'inline-block'
	}

	const imageStyle = {
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    width: '100%',
	    height: '100%',
	}

	const clear = {
		padding: 20,
		clear: 'both',
	}

	const left = {
		float: 'left',
	}

	const right = {
  	    float: 'right',
	}

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={true}>
				<div>
				</div>


				<div style={clear}>
				
					{ !onUserProfile ? 
						<div style={{float:'left', display: 'flex', alignItems: 'center'}}> 
	                        <img alt='meaningful text' style={style} src={review.author_profile_picture}/>
	                        <div style={{lineHeight: 1}}>
								<Link style={{color: theme.palette.primary1Color}} to={'/user/'+ review.user_id}>{review.author_display_name}</Link>
								<br />
							{ 
								review.created_at !== undefined 
							?
								<span style={{color: 'grey', fontSize: '0.77em'}}>
									{ review.created_at === review.updated_at ? props.locales.locales.created_at : props.locales.locales.updated_at}
									<TimeAgo date={review.created_at === review.updated_at ? review.created_at : review.updated_at} formatter={props.locales.locales._language === 'en' ? undefined : formatter}/>
								</span>
							: 
								<span style={{color: 'grey', fontSize: '0.77em'}}>
									{props.locales.locales.justNow}
								</span>
							}
							</div>
						</div> 

					: 	
						<div style={left}>
							<h3>
		                        <img alt='meaningful text' style={style} src={review.artist_profile_picture}/>
								<Link style={{color: theme.palette.primary1Color}} to={'/artists/'+ review.artist_id}>{review.artist_name}</Link>
							</h3>
						</div>
					}

					<div style={right}>
						<h3><span>{review.score}</span></h3>
					</div>

				<br />

				</div>

				<div>
					{
						review.media ? 
							isImage(review.media) ? <img alt="" style={imageStyle} src={review.media} /> : <ReactPlayer width='100%' height='auto' url={review.media} controls={true} />
					:
						<hr />
					}
				</div>

				<div style={clear}>
					<p>{review.body}</p>

				</div>

				<div>
                    { belongsToUser ? 
						<div  style={padded}>
							<RaisedButton 
								onClick={ () => onReviewSelect(review) }
								default={true}
								label={props.locales.locales.edit}/> 
						</div>
                    : 
                    	<p></p> 
                   	}
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
