import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import newReviewMutation from '../../mutations/newReview'
import _ from 'underscore'



// const validate = (context) => {
//     let {review} = context.state;
//     const body= review.body;
//     const score = review.score;
//     const media = review.media;    
// }

export const onUpdate = (e, context) => {  
    let {review} = context.state;
    const body= review.body;
    const score = review.score;
    const generosity = review.generosity;
    const technics = review.technics;
    const ambiant = review.ambiant;
    const media = review.media;

    if(body!=='' && score !==''){
        context.props.client.mutate({
            mutation: updateMutation, 
            variables: {
                id: review.id, 
                body:body,
                score:score,
                generosity: generosity,
                technics: technics,
                ambiant: ambiant,
                media: media }
            }).then(
            (res) => {
                const updatedArr = res.data.editReview.review
                context.props.updateUserReview(updatedArr)
				context.setState({showModal:false})
            },
            (err) => {
                console.log(err)
            	console.log('HANDLE ERROR!!!')
            }
        );
    } else {
    	console.log('HANDLE VALIDATIONS!!!')
    }
}

export const onDelete = (e, context) => {
    context.setState({ showModal: false });
    let {review} = context.state;
    context.props.client.mutate({mutation: deleteMutation, variables: {id: review.id}}).then(
        (res) => {
            context.props.deleteUserReview(review)
            context.setState({ selected: null })
			context.setState({ enabledButton: true })
            context.setState({ isUpdate:false});   
        },
        (err) => { }
    );
}

export const onSave = (e, context) => {        
    let {review} = context.state;
    const body= review.body;
    const score = review.score;
    const generosity = review.generosity;
    const technics = review.technics;
    const ambiant = review.ambiant;
    const media = review.media;

    if(body!=='' && score !==''){
    	context.props.client.mutate({
            mutation: newReviewMutation, 
            variables: {
                user_id: context.props.userInfo.user_id, 
                artist_id: context.props.match.params.id, 
                body: body, 
                score: score,
                generosity: generosity,
                technics: technics,
                ambiant: ambiant,
                media: media }
            }).then(
    	    (res) => {
    	        const newArr = res.data.newReview.review
    	        // context.props.addUserReview(newArr)
			    context.setState({ showModal: false })
				context.setState({ enabledButton: false })
    	    },
    	    (err) => { 
            	console.log('HANDLE ERROR!!!')
    	    }
    	);
    } else {
    	console.log('HANDLE VALIDATIONS!!!')    	
    }
}

export const setPerformanceScore = (value, context) => {
    context.setState({review:{...context.state.review, score: value }})
}

export const setGenerosityScore = (value, context) => {
    context.setState({review:{...context.state.review, generosity: value }})
}

export const setTechnicsScore = (value, context) => {
    context.setState({review:{...context.state.review, technics: value }})
}

export const setAmbiantScore = (value, context) => {
    context.setState({review:{...context.state.review, ambiant: value }})
}

export const setBody = (e, context) => {
    context.setState({review:{...context.state.review, body: e.target.value }})
}

export const setMedia = (value, context) => {
    context.setState({review:{...context.state.review, media: value }})
}

export const unsetMedia = (context) => {
    context.setState({review:{...context.state.review, media: null }})
}

export const handleModalClose = (context) => { 
	context.setState({ showModal: false });
}

export const handleModalShow = (review, context) => {
    if (review) {
        context.props.selectUserReview(review);
        context.setState({review:review});
        context.setState({isUpdate:true});        
    }
    context.setState({ showModal: true });
}
