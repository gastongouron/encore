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
 

const ReviewListItem = (props) => {

	const userId = props.userId
	const review = props.review
	const onReviewSelect = props.onReviewSelect
	const belongsToUser = (Number(userId) === Number(review.user_id))
	const onUserProfile = props.match.includes('user')
	const formatter = buildFormatter(frenchStrings)


	const style = {
	    objectFit: 'cover',
	    width: 20,
	    height: 20,
	    borderRadius: 10,
	    marginRight: 3,
		float: 'left',
	}

	const paperStyle = {
	  marginBottom: 20,
	  // padding: 20,
	};

	const padded = {
	  padding: 20,
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
				style={paperStyle} zDepth={3} 
				rounded={true}>
				<div>
				</div>


				<div style={clear}>
				
					{ !onUserProfile ? 
						<div style={left}> 
							<h3>
								<Link to={'/user/'+ review.user_id}>{review.author_display_name}</Link>
	                        	<img alt='meaningful text' style={style} src={review.author_profile_picture}/>
	                        </h3>
						</div> 

					: 	
						<div style={left}>
							<h3>
								<Link to={'/artists/'+ review.artist_id}>{review.artist_name}</Link>
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

					{ 
						review.created_at !== undefined 
					?
						<i style={{color: 'grey'}}>
							{ review.created_at === review.updated_at ? props.locales.locales.created_at : props.locales.locales.updated_at}
							<TimeAgo date={review.created_at === review.updated_at ? review.created_at : review.updated_at} formatter={props.locales.locales._language === 'en' ? undefined : formatter}/>
						</i>
					: 
						null
					}

				</div>

				<div style={padded}>
                    { belongsToUser ? 
						<RaisedButton 
							onClick={ () => onReviewSelect(review) }
							default={true}
							label={props.locales.locales.edit}/> 
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
