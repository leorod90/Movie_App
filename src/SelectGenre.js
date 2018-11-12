import React, { Component } from 'react';
import './selectGenre.css';
import axios from 'axios';

export default class BookingTabs extends Component {
  constructor(props) {
    super(props);
  }

  async selectTheGenre(genreId) {
    const key = '6c8d3a1188a80d68dc03e78a34a5a263';
    
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`);
      //awaits axios to finish then gets movie list
      const results = response.data.results;

      let myArray = Array.from(document.querySelectorAll('.search-by'));
      myArray.forEach(e => {
        e.classList.remove("active");
      })

      this.props.changeGenreRow(results)
    } catch (error) {
      alert(error);
    }
  }
  render() {

    const genre = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Sci-Fi"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ];
    return (
      <div className="genreContain">
        {genre.map(e => {
          return (
            <button className="genreBtn" onClick={() => this.selectTheGenre(e.id)} key={e.id}>{e.name}</button>
          )
        })}
      </div>
    )
  }
}