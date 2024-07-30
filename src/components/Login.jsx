import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sayfa yüklendiğinde, eğer oturum hatırlanmışsa giriş yap
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const isRemembered = localStorage.getItem('isRemembered') === 'true';
    
    if (savedEmail && savedPassword && isRemembered) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      onLogin();
      navigate('/main/calendar');
    }
  }, [navigate, onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'info@epsilam.com' && password === '123456') {
      onLogin();
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('isRemembered', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.setItem('isRemembered', 'false');
      }
      navigate('/main/calendar');
    } else {
      alert('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
