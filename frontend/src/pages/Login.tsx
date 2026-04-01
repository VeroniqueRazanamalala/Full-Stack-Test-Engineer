import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert("Connexion réussie ! Vos boutons sont débloqués.");
      navigate('/'); 
    } catch (err) {
      alert("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" style={{ backgroundColor: '#646cff', color: 'white', padding: '10px' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};
