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
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/image/edit';

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

	const imageStyle = {
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    width: '100%',
	    height: '100%',
	}

	const header = {
		// padding:20,
		// paddingTop: 20,
	}

	const body = {
		padding: 20,
		paddingTop: 20,
		paddingBottom: 20,
	}

	const paperStyle = { marginBottom: 20 };
	const left = { float: 'left' }
	const right = { float: 'right' }

	return (
			<Paper
				style={paperStyle} zDepth={1} 
				rounded={true}>
				<div>
				</div>


				<div style={header}>
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
				          rightIcon={<div style={right}> {review.score} </div>}
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

				<div style={body}>
                    { belongsToUser && onUserProfile ? 
						<div  style={header}>


							<RaisedButton 
								style={{float: 'right', marginTop: -10}}
								onClick={ () => onReviewSelect(review) }
								default={true}
								label={props.locales.locales.edit}/> 
						</div>
                    : 
                    	null
                   	}
					<p>{review.body}</p>

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
