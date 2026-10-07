import { ActorList } from './ActorList';

export function MovieCard({ movie, onDelete, onEdit }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1a1a1a' }}>
          {movie.title} <span style={{ fontSize: '0.8em', color: '#666' }}>({movie.releaseYear})</span>
        </h2>
        <div>
          <button onClick={() => onEdit(movie)} style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}>✏️ Редактирай</button>
          <button onClick={() => onDelete(movie.id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Изтрий</button>
        </div>
      </div>
      <ActorList actors={movie.actors} />
    </div>
  );
}


