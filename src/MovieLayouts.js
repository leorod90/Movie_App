import React, { Component } from 'react';
import Parser from 'html-react-parser';
import loopGenre from './loopGenre';
import axios from 'axios';
import './MovieLayouts.css';

class MovieLayouts extends Component {
    getStars(rating) {

        // Round to nearest half
        rating = Math.round(rating * 2) / 2;
        let output = [];

        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--)
            output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // If there is a half a star, append it
        if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // Fill the empty stars
        for (let i = (5 - rating); i >= 1; i--)
            output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        return (output.join(''));
    }

    async getMovieTrailer(id) {
        var newTab = window.open('', '_blank');
        const response = await axios.get(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=6c8d3a1188a80d68dc03e78a34a5a263`);
        if (response.data.results.length > 0) {
            const youtubeKey = response.data.results[0].key;
            const youtubeUrl = `https://www.youtube.com/watch?v=`;
            // await window.open(youtubeUrl + youtubeKey);
            var url = youtubeUrl + youtubeKey;
            newTab.location.href = url
            // document.querySelector('.iframe-container').innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeKey}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

        } else {
            newTab.close();
            alert('Sorry, No Trailer Found!');
        }
    }

    render() {
        const { id, poster, title, vote_average, release_date, genre_ids } = this.props.movie;
        return (<div key={id}>
            <div className="movie-body">
                <div className="movie-background">
                    <div className="poster-div">
                        <img className="poster" src={poster} alt={title} width="120" />
                    </div>
                    <div className="title-div">
                        <p className="title">{title}</p>
                        <p className="rating">{Parser(this.getStars(vote_average / 2))} {(vote_average / 2).toFixed(1)}</p>
                        <p className="date">{release_date}</p>
                        <p className="genre">{Parser(loopGenre(genre_ids))}</p>
                        <i className="far fa-play-circle" onClick={() => this.getMovieTrailer(id)}></i>
                    </div>
                </div>
            </div>
        </div>);
    }
};


export default MovieLayouts;