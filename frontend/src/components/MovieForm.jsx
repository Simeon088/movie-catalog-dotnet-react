import { useState, useEffect } from 'react';

export function MovieForm({ onSubmit, editingMovie, onCancel, availableActors }) {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [selectedActorIds, setSelectedActorIds] = useState([]);

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setReleaseYear(editingMovie.releaseYear);
      setSelectedActorIds(editingMovie.actors ? editingMovie.actors.map(a => a.id) : []);
    } else {
      setTitle('');
      setReleaseYear('');
      setSelectedActorIds([]);
    }
  }, [editingMovie]);

  const handleActorToggle = (actorId) => {
    setSelectedActorIds(prev => 
      prev.includes(actorId) ? prev.filter(id => id !== actorId) : [...prev, actorId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !releaseYear) return alert('Моля, попълнете заглавие и година.');
    
    onSubmit({
      title,
      releaseYear: parseInt(releaseYear),
      actorIds: selectedActorIds
    });

    if (!editingMovie) {
      setTitle('');
      setReleaseYear('');
      setSelectedActorIds([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid #007bff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
      <h3>{editingMovie ? '✏️ Редактиране на филм' : '➕ Добавяне на нов филм'}</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Заглавие: </label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Година на издаване: </label>
        <input type="number" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Изберете актьори:</label>
        <div>
          {availableActors.map(actor => (
            <label key={actor.id} style={{ display: 'block', margin: '4px 0' }}>
              <input
                type="checkbox"
                checked={selectedActorIds.includes(actor.id)}
                onChange={() => handleActorToggle(actor.id)}
              />
              {actor.name}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
        {editingMovie ? 'Запази промените' : 'Добави филм'}
      </button>
      {editingMovie && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px', padding: '8px 16px' }}>Отказ</button>
      )}
    </form>
  );
}
