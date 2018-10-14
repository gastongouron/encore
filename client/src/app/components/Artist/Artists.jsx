import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initArtists, loadingArtists, failedArtists, setArtists } from '../../actions/artists'
import artistListQuery from '../../queries/ArtistSchema'
import ArtistList from './ArtistList'
import SearchBar from './ArtistSearchBar'
import Loader from 'react-loader-spinner'
import _ from 'underscore'

const loaderContainer = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto'
}

const loader = {
    margin: 'auto', 
    maxHeight: '100%'
}

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
        // if (this.props.artists.artists.length > 0)
        //     return;
        this.props.loadingArtists();
        this.props.client.query({query: artistListQuery, fetchPolicy: 'network-only'}).then(
            (res) => {
                this.props.setArtists(res.data.artists);
                this.setState({artists: res.data.artists})
            },
            (err) => {
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
            <div> { this.props.artists.loading 
                ? 
                    <div style={loaderContainer}>
                        <div style={loader}>
                            <Loader 
                               type="RevolvingDot"
                               color="#283593"
                               height="50"   
                               width="50"
                            />
                        </div>
                  </div>

                : this.props.artists.error ? <h1>Error...</h1> : 
                    <div>
                        <SearchBar onSearchTermChange={this.artistSearch}/>
                        <br />
                        <br />
                        <ArtistList
                            onArtistSelect={selectedArtist => this.navigateTo({selectedArtist}) }
                            artists={this.state.artists}
                        />
                    </div> 
                }
            </div>
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
