import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "69df8256"; // Your OMDb API Key

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
      const response = await axios.get(
        https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}
      );

      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setError("No movies found.");
        setMovies([]);
      }
    } catch (error) {
      setError("Failed to fetch movies. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch movie details
  const fetchMovieDetails = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}
      );
      setSelectedMovie(response.data);
    } catch (error) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie Search App</h1>

      <div className="search-container flex justify-center gap-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="p-2 border rounded-lg text-black w-1/2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchMovies}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="movies-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => fetchMovieDetails(movie.imdbID)}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="rounded-lg w-full"
            />
            <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
            <p className="text-gray-400">{movie.Year}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="movie-details bg-gray-900 p-6 rounded-lg max-w-md text-center">
            <h2 className="text-2xl font-bold">{selectedMovie.Title}</h2>
            <img
              src={selectedMovie.Poster}
              alt={selectedMovie.Title}
              className="rounded-lg mt-4 w-full"
            />
            <p className="mt-4">{selectedMovie.Plot}</p>
            <p className="mt-2">
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
            <p>
              <strong>Director:</strong> {selectedMovie.Director}
            </p>
            <p>
              <strong>Rating:</strong> {selectedMovie.imdbRating}
            </p>
            <button
              onClick={() => setSelectedMovie(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
