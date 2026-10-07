export function ActorList({ actors }) {
    if (!actors || actors.length === 0) return <p>Няма въведени актьори.</p>;

    return (
        <div style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '8px' }}>
            <strong>Актьорски състав:</strong>
            <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                {actors.map(actor => (
                    <li key={actor.id} style={{ marginBottom: '4px' }}>
                        <strong>{actor.name}</strong> — <small>{actor.bio}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
