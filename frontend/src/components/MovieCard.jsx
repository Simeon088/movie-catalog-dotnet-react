import { ActorList } from './ActorList';

export function MovieCard({ movie }) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#f9f9f9',
            color: '#333'
        }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#1a1a1a' }}>
                {movie.title} <span style={{ fontSize: '0.8em', color: '#666' }}>({movie.releaseYear})</span>
            </h2>
            <ActorList actors={movie.actors} />
        </div>
    );
}
