import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { initArtists, loadingArtists, failedArtists, setArtists } from '../../actions/artists'
import artistSearchQuery from '../../queries/ArtistSearch'
import artistByTagNameQuery from '../../queries/ArtistByTagName'
import ArtistList from './ArtistList'
import SearchBar from './ArtistSearchBar'
import EncoreLoader from '../EncoreLoader'
import __ from 'lodash';

class Artists extends Component {

    constructor(props){
        super(props);
        this.state = {
            artists: this.props.artists.artists,
            locales: this.props.locales.locales,
            selectedArtist: null,
            hasMore: true,
            searchTerm: '',
            tag: ''
          }
        this.artistSearch = this.method = __.debounce(this.artistSearch.bind(this), 500);
        this.scrollFetch = this.scrollFetch.bind(this)
        this.onClickTag = this.onClickTag.bind(this)
    }

	componentWillMount(){
        this.props.loadingArtists();
        this.props.client.query({query: artistSearchQuery, fetchPolicy: 'network-only', variables: {first:20}}).then(
            (res) => {
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
        this.setState({searchTerm: term.toLowerCase()})
        this.props.client.query({query: artistSearchQuery, fetchPolicy: 'network-only', variables: {input: term.toLowerCase() }}).then(
            (res) => {
                this.setState({artists: res.data.allArtists})
                if (res.data.allArtists.length === 0) { this.setState({hasMore: false}) }
            },
            (err) => {
                this.props.failedArtists(err.data);
            }
        )
    }

    onClickTag(tagname) {
        this.setState(tagname)
        window.scrollTo(0, 0)
        this.child.method(tagname)

        this.props.client.query({query: artistByTagNameQuery, fetchPolicy: 'network-only', variables: {input: tagname.tag.toLowerCase() }}).then(
            (res) => {
                this.setState({artists: res.data.tagged})
                if (res.data.tagged.length === 0) { this.setState({hasMore: false}) }
            },
            (err) => {
                this.props.failedArtists(err.data);
            }
        )
    }

    scrollFetch(first=null, skip=null) {
        const variables = this.state.searchTerm ? {input: this.state.searchTerm.toLowerCase(), first:first, skip:skip } : {first:first, skip:skip } 
        this.props.client.query({query: artistSearchQuery, fetchPolicy: 'network-only', variables: variables}).then(
            (res) => {
                this.setState({artists: this.state.artists.concat(res.data.allArtists)});
                if (res.data.allArtists.length === 0) { this.setState({hasMore: false}) }
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
                    <EncoreLoader />

                : this.props.artists.error ? <h1>Error...</h1> : 
                    <div>
                        <SearchBar 
                            onRef={ref => (this.child = ref)} 
                            onSearchTermChange={this.artistSearch}
                        />
                        <br />
                        <br />
                        <ArtistList
                            onClickTag={tag => this.onClickTag({tag})}
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
    return {
        artists: state.artists,
        locales: state.locales
     };
};

const mapDispatchToProps = dispatch => {
    return {
        initArtists: () => dispatch(initArtists()),
        loadingArtists: () => dispatch(loadingArtists()),
        failedArtists: (message) => dispatch(failedArtists(message)),
        setArtists: (artists) => dispatch(setArtists(artists))
    };
};
  
export default withApollo( connect(mapStateToProps, mapDispatchToProps)(Artists) );
