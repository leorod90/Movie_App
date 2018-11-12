import axios from 'axios';

export default async function (query = 'batman') {
    const key = '6c8d3a1188a80d68dc03e78a34a5a263';
    //const query = 'batman';

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}`);
        //awaits axios to finish then gets movie list
        const results = response.data.results;
        
        return results
    } catch (error) {
        alert(error);
    }
};

