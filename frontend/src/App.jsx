import { useState, useEffect } from 'react';
import { MovieCard } from './components/MovieCard';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Заявка към ASP.NET Core Web API
        fetch('http://localhost:5000/api/movies')
            .then(res => {
                if (!res.ok) throw new Error('Грешка при връзката с API');
                return res.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Не може да се заредят данните от бакенда.');
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>🎬 Каталог Филми и Актьори</h1>
            {loading && <p>Зареждане на данните...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

