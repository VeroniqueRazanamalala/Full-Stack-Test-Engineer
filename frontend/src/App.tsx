import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CandidateList } from './pages/CandidateList';
import { CandidateForm } from './pages/CandidateForm';
import { CandidateDetail } from './pages/CandidateDetail';
import { Login } from './pages/Login';

function App() {
  
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/"; 
  };

  return (
    <Router>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        
      
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '20px', 
          marginBottom: '30px', 
          borderBottom: '2px solid #eee', 
          paddingBottom: '15px' 
        }}>
          <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#646cff' }}>
            📁 Liste des Candidats
          </Link>
          
          <Link to="/add" style={{ textDecoration: 'none', color: '#646cff' }}>
            ➕ Ajouter un Candidat
          </Link>

          
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              style={{ 
                marginLeft: 'auto', 
                backgroundColor: 'transparent', 
                border: '1px solid #ff4444', 
                color: '#ff4444', 
                padding: '5px 12px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Déconnexion
            </button>
          )}
        </nav>

        {/* CONFIGURATION DES ROUTES */}
        <Routes>
          
          <Route path="/" element={<CandidateList />} />
          
  
          <Route path="/add" element={<CandidateForm />} />
          
          
          <Route path="/candidate/:id" element={<CandidateDetail />} />
          
          
          <Route path="/edit/:id" element={<CandidateForm />} /> 
          
          
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
