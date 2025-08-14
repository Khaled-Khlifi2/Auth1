import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Save token and navigate to protected route
      localStorage.setItem('token', data.token);
      navigate('/discussion');
    } catch (err) {
      setError('Server error, please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: 20
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        padding: 30,
        borderRadius: 12,
        backgroundColor: '#fff',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#333' }}>Login</h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, color: '#555' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #ccc',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5, color: '#555' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #ccc',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#4f46e5',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 15, color: '#555' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
