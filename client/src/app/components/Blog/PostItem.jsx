import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
// import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Divider from 'material-ui/Divider';
// import Truncate from 'react-truncate';
// import theme from '../../theme'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Disqus from 'disqus-react'

const PostItem = (props) => {

	const post = props.post
	const formatter = buildFormatter(frenchStrings)
	
	const rootz = {
	top: 0,
	position: 'absolute',
	  flexGrow: 1,
	}

	const padded = {
	  padding: 20,
	}

	const floatLeft = {
	  float: 'left',
	}

	// const floatRight = {
	//   float: 'right',
	//   color: theme.palette.primary1Color,
	// }

	const paperStyle = {
      margin: 2,
	  marginBottom: 20,
	};

	
	const coverStyle = {
	    objectFit: 'cover',
	    backgroundSize: 'cover',
	    width: '100%',
	    height: 400,
	}

	return (

				<div style={rootz}>
					<Grid container>
						<img alt="" style={coverStyle} src={post.image_url}/>
				        <Grid style={{maxWidth: 840, margin: '0 auto'}} item xs={12} sm={12} md={12}>
							<Grid style={padded} container>
					        	<Grid style={floatLeft} item xs={12}>
					        		<h1 >
						        		{post.title}
									</h1>
								{post.author}&nbsp;					        	
								<TimeAgo style={{color: 'grey', fontSize: '0.77em'}} date={post.created_at} formatter={props.locales.locales._language === 'en' ? undefined : formatter}/>
					        	</Grid>
					        </Grid>
							<Grid style={padded} container>
								<p dangerouslySetInnerHTML={{ __html: post.body }}/>
							</Grid>
							<Divider/>
							<Grid style={padded}>
		                        <Disqus.DiscussionEmbed shortname='encore-2' config={{ url: window.location.href, identifier: post.id, title: post.title}} />
							</Grid>
						</Grid>
				    </Grid>
				</div>

		)

}




const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default connect(mapStateToProps, null)(PostItem)