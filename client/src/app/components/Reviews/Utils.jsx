import React, {Component} from 'react';
import updateMutation from '../../mutations/updateReview'
import deleteMutation from '../../mutations/deleteReview'
import newReviewMutation from '../../mutations/newReview'



// const someCommonValues = ['common', 'values'];

export const doSomethingWithInput = (theInput) => {
    return theInput;
};

export const handleUpdateChange = (e, currentState) => {
    switch(e.target.id) {
        case 'body':
            currentState.setState({selected:{...currentState.state.selected, body:e.target.value }})
            break;
        case 'score':
            currentState.setState({selected:{...currentState.state.selected, score:e.target.value }})
            break;
    }
}

export const handleModalUpdateClose = (e, currentState) => {
	currentState.props.history.goBack()
}


    // onUpdate(e) {
    //     this.setState({ showModalUpdate: false });
    //     let {selected} = this.state;
    //     const val = selected.body;
    //     const score = selected.score;
    //     if(val!=='' && score!==''){
    //         this.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:val, score:score }}).then(
    //             (res) => {
    //                 const updatedArr = res.data.editReview.review
    //                 this.props.updateReview(updatedArr)
    //             },
    //             (err) => {
    //             }
    //         );
    //     }else{
    //         console.log('todo: handle validation')
    //     }
    // }


export const onUpdate = (e, currentState) => {    
    let {selected} = currentState.state;
    const val = selected.body;
    const score = selected.score;

    if(val!==''){
        currentState.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:val, score:score }}).then(
            (res) => {
                const updatedArr = res.data.editReview.review
                currentState.props.updateUserReview(updatedArr)
                // currentState.props.history.goBack()
                // Handle layout specific behaviors
            },
            (err) => {

            }
        );
    }
}

export const onDelete = (e, currentState) => {
    let {selected} = currentState.state;
    currentState.props.client.mutate({mutation: deleteMutation, variables: {id: selected.id}}).then(
        (res) => {
            currentState.props.deleteUserReview(selected)
            currentState.props.history.goBack()
        },
        (err) => { }
    );
}


export const onSave = (e, currentState) => {        
    currentState.setState({ showModalNew: false });
    // if(ArtistDetail.val1===undefined||ArtistDetail.val1.trim()===''){
    // } else {
    currentState.props.client.mutate({mutation: newReviewMutation, variables: {user_id: currentState.props.userInfo.user_id, artist_id: currentState.props.match.params.id, body: currentState.state.newReviewBody, score: currentState.state.newReviewScore }}).then(
        (res) => {
            const newArr = res.data.newReview.review
            currentState.props.addUserReview(newArr)
            currentState.setState({enabledButton: false});},
        (err) => { }
    );
    // }
}



     // onSave(e){        
    //     this.setState({ showModalNew: false });
    //     // if(ArtistDetail.val1===undefined||ArtistDetail.val1.trim()===''){
    //     // } else {
    //     this.props.client.mutate({mutation: newReviewMutation, variables: {user_id: this.props.userInfo.user_id, artist_id: this.props.match.params.id, body: this.state.newReviewBody, score: this.state.newReviewScore }}).then(
    //         (res) => {
    //             const newArr = res.data.newReview.review
    //             this.props.addNewReview(newArr)
    //             this.setState({enabledButton: false});},
    //         (err) => { }
    //     );
    //     // }
    // }

    // onUpdate(e) {
    //     this.setState({ showModalUpdate: false });
    //     let {selected} = this.state;
    //     const val = selected.body;
    //     const score = selected.score;
    //     if(val!=='' && score!==''){
    //         this.props.client.mutate({mutation: updateMutation, variables: {id: selected.id, body:val, score:score }}).then(
    //             (res) => {
    //                 const updatedArr = res.data.editReview.review
    //                 this.props.updateReview(updatedArr)
    //             },
    //             (err) => {
    //             }
    //         );
    //     }else{
    //         console.log('todo: handle validation')
    //     }
    // }

    // onDelete(e) {
    //     this.setState({ showModalUpdate: false });
    //     let {selected} = this.state;
    //     this.props.client.mutate({mutation: deleteMutation, variables: {id: selected.id}}).then(
    //         (res) => {
    //             this.props.deleteReview(selected)
    //             this.setState({enabledButton: true})},
    //         (err) => { }
    //     );
    // }