import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search movies
  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://weather-backend-neon.vercel.app/api/movie/${id}`);
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setError("No movies found.");
      }
    } catch (error) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch movie details
  const fetchMovieDetails = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/movie/${id}`);
      setSelectedMovie(response.data);
    } catch (error) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={() => fetchMovieDetails(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p>{selectedMovie.Plot}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Rating:</strong> {selectedMovie.imdbRating}</p>
          <button onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
