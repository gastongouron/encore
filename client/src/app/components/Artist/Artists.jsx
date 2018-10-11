import React, { Component } from 'react';
import { connect } from "react-redux";
import { withApollo } from 'react-apollo'
import { initArtists, loadingArtists, failedArtists, setArtists } from '../../actions/artists'
import _ from 'underscore';
import artistListQuery from '../../queries/ArtistSchema'
import ArtistList from './ArtistList'
import SearchBar from './ArtistSearchBar'

class Artists extends Component {

    constructor(props){
        super(props);
        this.state = {
            artists: this.props.artists.artists,
            selectedArtist: null
          }
        this.artistSearch = this.artistSearch.bind(this)
    }

	componentWillMount(){
        if (this.props.artists.artists.length > 0)
            return;
        this.props.loadingArtists();
        this.props.client.query({query: artistListQuery, fetchPolicy: 'network-only'}).then(
            (res) => {
                this.props.setArtists(res.data.artists);
                this.setState({artists: res.data.artists})}
           ,(err) => {
                this.props.failedArtists(err.data);
            }
        );
    }

    navigateTo(artist){
        let id = artist.selectedArtist.id
        this.props.history.push(`/artists/${id}`)
    }
    
    artistSearch(term) {
        let list = this.props.artists.artists
        let newlist = _.map(list, function(artist){ 
            let a = artist.name.toLowerCase()
            let t = term.toLowerCase()
            if (a.includes(t) || a == t ) { return artist } else { return }
        });
        Object.keys(newlist).forEach(artist => newlist[artist] === undefined ? delete newlist[artist] : '');
        this.setState({
            artists: newlist
        })
    }

    render() {
        return (
            <div> { this.props.artists.loading ? <h1>Loading...</h1> : this.props.artists.error ? <h1>Error...</h1> : 
                <div>
                    <SearchBar onSearchTermChange={this.artistSearch}/>
                    <ArtistList 
                        onArtistSelect={selectedArtist => this.navigateTo({selectedArtist}) }
                        artists={this.state.artists} 
                    />
                </div> 
            }</div>
        )
    }

}

const mapStateToProps = state => {
    return { artists: state.artists };
};

const mapDispatchToProps = dispatch => {
    return {
        initArtists: () => dispatch(initArtists()),
        loadingArtists: () => dispatch(loadingArtists()),
        failedArtists: (message) => dispatch(failedArtists(message)),
        setArtists: (artists) => dispatch(setArtists(artists)),
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Artists) );
