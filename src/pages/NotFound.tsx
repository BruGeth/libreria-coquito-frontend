const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '2rem' }}>
        Página no encontrada
      </h2>
      <p style={{ color: '#9ca3af' }}>
        La página que buscas no existe o ha sido movida.
      </p>
    </div>
  );
};

export default NotFound;
