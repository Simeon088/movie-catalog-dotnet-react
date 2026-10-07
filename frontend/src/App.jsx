import { useState, useEffect } from 'react';
import { MovieCard } from './components/MovieCard';
import { MovieForm } from './components/MovieForm';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovies = () => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  };

  const fetchActors = () => {
    fetch('http://localhost:5000/api/movies/actors')
      .then(res => res.json())
      .then(data => setActors(data));
  };

  useEffect(() => {
    Promise.all([fetchMovies(), fetchActors()]).then(() => setLoading(false));
  }, []);

  // CREATE / UPDATE
  const handleSaveMovie = (movieData) => {
    if (editingMovie) {
      // PUT
      fetch(`http://localhost:5000/api/movies/${editingMovie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      }).then(() => {
        setEditingMovie(null);
        fetchMovies();
      });
    } else {
      // POST
      fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      }).then(() => fetchMovies());
    }
  };

  // DELETE
  const handleDeleteMovie = (id) => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете този филм?')) {
      fetch(`http://localhost:5000/api/movies/${id}`, { method: 'DELETE' })
        .then(() => fetchMovies());
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎬 Каталог Филми и Актьори </h1>
      
      <MovieForm
        onSubmit={handleSaveMovie}
        editingMovie={editingMovie}
        onCancel={() => setEditingMovie(null)}
        availableActors={actors}
      />

      {loading ? <p>Зареждане...</p> : movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={handleDeleteMovie}
          onEdit={m => setEditingMovie(m)}
        />
      ))}
    </div>
  );
}
