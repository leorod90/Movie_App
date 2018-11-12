import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
//import preformSearch from './axiosGet';
import MovieLayouts from './MovieLayouts';
import SelectGenre from './SelectGenre';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async searchMovie(query) {
    const key = '6c8d3a1188a80d68dc03e78a34a5a263';
    var movieRows;

    try {
      if (query) {

        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}`);
        //awaits axios to finish then gets movie list
        const results = response.data.results;
        //loop though movie list and render
        movieRows = [];

        results.forEach(movie => {
          //console.log(movie)
          movie.poster = `https://image.tmdb.org/t/p/w185${movie.poster_path}`
          const movieLay = <MovieLayouts key={movie.id} movie={movie} />
          movieRows.push(movieLay)
        });

        this.setState({ movieRows: movieRows })

        if (results.length === 0) {
          movieRows = <div className="error">No Movies Were Found!</div>
          this.setState({ movieRows: movieRows })
        }

      } else if (!query) {
        movieRows = <div className="error">No Movies Were Found!</div>
        this.setState({ movieRows: movieRows })
      }

      this.toggleClass();

    } catch (error) {
      if (query === ' ') {
        movieRows = <div className="error">No Movies Were Found!</div>
        this.setState({ movieRows: movieRows })
      } else {
        alert(error);

      }
    }

  };
  async upcomingMovies() {
    const key = '6c8d3a1188a80d68dc03e78a34a5a263';
    var movieRows;
    document.getElementById('input').value = '';

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`);
      //awaits axios to finish then gets movie list
      const results = response.data.results;
      //loop though movie list and render
      movieRows = [];

      results.forEach(movie => {
        //console.log(movie)
        movie.poster = `https://image.tmdb.org/t/p/w185${movie.poster_path}`
        const movieLay = <MovieLayouts key={movie.id} movie={movie} />
        movieRows.push(movieLay)
      });

      this.setState({ movieRows: movieRows })
      this.toggleClass('upcomingBtn')

    } catch (error) {
      alert(error);
    }

  }
  changeGenreRow(list) {
    let movieRows = [];

    list.forEach(movie => {
      //console.log(movie)
      movie.poster = `https://image.tmdb.org/t/p/w185${movie.poster_path}`
      const movieLay = <MovieLayouts key={movie.id} movie={movie} />
      movieRows.push(movieLay)
    });

    this.setState({ movieRows: movieRows })

  }
  selectGenre() {
    const movieGen = <SelectGenre changeGenreRow={this.changeGenreRow.bind(this)} />
    this.setState({ movieRows: movieGen })
    document.getElementById('input').value = '';
    this.toggleClass('genreBtn')
  }

  searchHandler(e) {
    let input = e.target.value;
    let str = input.replace(/^ +/gm, '');
    this.searchMovie(str)
  }

  toggleClass(active) {
    let myArray = Array.from(document.querySelectorAll('.search-by'));
    myArray.forEach(e => {
      e.classList.remove("active");
    })
    if (active) {
      document.getElementById(`${active}`).classList.add("active");
    }
  }
  componentDidMount() {
    this.upcomingMovies()
  }
  render() {
    const { movieRows } = this.state;
    return (<div className="smartphone">
      <div className="App">
        <table className="table">
          <tbody>
            <tr>
              <td><h1>Movies</h1></td>
              <td width="50%"></td>
              <td>
                <div className="search">
                  <span className="fa fa-search"></span>
                  <input id="input" placeholder="Search term" onChange={this.searchHandler.bind(this)} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-div">
          <button id="upcomingBtn" className="search-by active" onClick={this.upcomingMovies.bind(this)}>Upcoming Movies</button>
          <button id="genreBtn" className="search-by" onClick={this.selectGenre.bind(this)}>Select By Genre</button>
        </div>

        {movieRows}

      </div>
    </div>);
  }
}

export default App;
