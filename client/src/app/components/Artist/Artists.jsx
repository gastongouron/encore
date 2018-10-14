import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initArtists, loadingArtists, failedArtists, setArtists } from '../../actions/artists'
import artistListQuery from '../../queries/ArtistSchema'
import artistSearchQuery from '../../queries/ArtistSearch'
import ArtistList from './ArtistList'
import SearchBar from './ArtistSearchBar'
import Loader from 'react-loader-spinner'
// import _ from 'underscore'

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
            selectedArtist: null,
            hasMore: true,
            searchTerm: ''

          }
        this.artistSearch = this.artistSearch.bind(this)
        this.scrollFetch = this.scrollFetch.bind(this)
    }

	componentWillMount(){
        // if (this.props.artists.artists.length > 0)
        //     return;
        this.props.loadingArtists();
        // this.props.client.query({query: artistListQuery, fetchPolicy: 'network-only'}).then(
        this.props.client.query({query: artistSearchQuery, fetchPolicy: 'network-only', variables: {first:20}}).then(
            (res) => {
                console.log('in res')
                console.log(res)
                // this.props.setArtists(res.data.artists);
                // this.setState({artists: res.data.artists})
                this.props.setArtists(res.data.allArtists);
                this.setState({artists: res.data.allArtists})
            },
            (err) => {
                this.props.failedArtists(err.data);
            }
        );
    }

    navigateTo(artist){
        this.props.history.push(`/artists/${artist.selectedArtist.id}`)
    }
    
    artistSearch(term) {
        this.setState({searchTerm: term})
        this.props.client.query({query: artistSearchQuery, fetchPolicy: 'network-only', variables: {input: term.toLowerCase() }}).then(
            (res) => {
                this.setState({artists: res.data.allArtists})
                if (res.data.allArtists.length == 0) { this.setState({hasMore: false}) }
            },
            (err) => {
                this.props.failedArtists(err.data);
            }
        )
    }


    scrollFetch(first=null, skip=null) {
        console.log('term?')
        console.log(this.state.searchTerm)
        const variables = this.state.searchTerm ? {input: this.state.searchTerm.toLowerCase(), first:first, skip:skip } : {first:first, skip:skip } 

        this.props.client.query({query: artistSearchQuery, fetchPolicy: 'network-only', variables: variables}).then(
            (res) => {
                this.setState({artists: this.state.artists.concat(res.data.allArtists)});
                if (res.data.allArtists.length == 0) { this.setState({hasMore: false}) }
            },
            (err) => {
                this.props.failedArtists(err.data);
            }
        )
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
                            hasMore={this.state.hasMore}
                            onFetch={this.scrollFetch}
                            dataLength={this.state.artists.length}
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
