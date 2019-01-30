import { connect } from 'react-redux'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
// import Divider from 'material-ui/Divider';
// import Truncate from 'react-truncate';
import theme from '../../theme'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Disqus from 'disqus-react'
import {List, ListItem} from 'material-ui/List';

const PostListItem = (props) => {

	const post = props.post
	const formatter = buildFormatter(frenchStrings)
	
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
      color: 'white',
      paddingTop: 170,
      paddingBottom: 170,
      textAlign: "center",
	  marginBottom: 0,
	};



	const backgroundImage = {
	  backgroundImage: 'url('+post.image_url+')',
      textAlign: "center",
      "-webkit-filter": "grayscale(100%)",
      filter: "grayscale(5%)",
	  backgroundSize: 'cover',
	  margin: '0 auto',
	  "&:hover":{
	      "-webkit-filter": "none",
	      filter: "none",
	  }
	}

	
	// const coverStyle = {
	//     objectFit: 'cover',
	//     backgroundSize: 'cover',
	//     width: '100%',
	//     height: 200,
	// }

	return (
            <ListItem innerDivStyle={backgroundImage}>
              <Link  to={"/fanzine/posts/" + post.id} style={{ textDecoration: 'none' }}>
					<div style={paperStyle}>
	
					        		<span style={{color: "white", fontSize: 40, fontWeight: 800, lineHeight: 1}}>
						        			{post.title}
					        		</span>
					        		<br/>
					        		<br/>
								Par {post.author}&nbsp;—&nbsp;		

								<TimeAgo date={post.created_at} formatter={props.locales.locales._language === 'en' ? undefined : formatter}/>
								<br/>
								<br/>
		                        <Disqus.CommentCount shortname='encore-2' config={{ url: window.location.href, identifier: post.id, title: post.title}}>
		                            Comments
		                        </Disqus.CommentCount>
						</div>

			</Link>
			</ListItem>
		)

}




const mapStateToProps = state => {
    return {
        locales: state.locales
     };
};
  
export default connect(mapStateToProps, null)(PostListItem)