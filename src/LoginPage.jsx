import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Import the CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!username || !password) {
        setError('Both fields are required.');
        setLoading(false);
        return;
      }
      try {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password); 
  
        setSuccessMessage('Login successful!');
        navigate('/profile');
      } catch (error) {
        setError('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }

  };

  return (
    <div className="login-page background-color-light">
      <h2 className='text-success'>Get Into Carbon-World</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className='bg-success text-light text-centre ' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {successMessage && <p className="success-text">{successMessage}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
