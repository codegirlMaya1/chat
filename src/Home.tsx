import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user) {
      localStorage.setItem('user', user);
      navigate('/chat');
    }
  };

  return (
    <div className="container">
      <h1>Select User</h1>
      <select onChange={(e) => setUser(e.target.value)} className="form-select">
        <option value="">Select User</option>
        <option value="A">User A</option>
        <option value="B">User B</option>
        <option value="C">User C</option>
        <option value="D">User D</option>
      </select>
      <button onClick={handleLogin} className="btn btn-primary mt-2">Sign In</button>
    </div>
  );
};

export default Home;
