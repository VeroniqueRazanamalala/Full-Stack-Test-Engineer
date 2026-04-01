import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export const CandidateDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  
  
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  useEffect(() => {
    api.get(`/candidates/${id}`)
      .then(res => {
        setCandidate(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération :", err);
        setLoading(false);
      });
  }, [id]);

  
  const checkAccess = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginNotice(true);
      return false;
    }
    return true;
  };

  const handleValidate = async () => {
    if (!checkAccess()) return; 

    setIsValidating(true);
    try {
      await api.post(`/candidates/${id}/validate`);
      alert("Candidat validé avec succès !");
      navigate('/'); 
    } catch (error) {
      alert("Erreur lors de la validation");
    } finally {
      setIsValidating(false);
    }
  };

  const handleDelete = async () => {
    if (!checkAccess()) return; 

    if (window.confirm("Voulez-vous vraiment supprimer ce candidat ?")) {
      try {
        await api.delete(`/candidates/${id}`);
        alert("Candidat supprimé avec succès !");
        navigate('/'); 
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleEditRedirect = () => {
    if (!checkAccess()) return; 
    navigate(`/edit/${id}`);
  };

  if (loading) return <p>Chargement du profil...</p>;
  if (!candidate) return <p>Candidat introuvable.</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Détails du Candidat</h1>
      <hr />
      
      <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p><strong>Prénom :</strong> {candidate.firstName}</p>
        <p><strong>Nom :</strong> {candidate.lastName}</p>
        <p><strong>Email :</strong> {candidate.email}</p>
        <p>
          <strong>Statut :</strong> 
          <span style={{ 
            marginLeft: '10px', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            backgroundColor: candidate.status === 'validated' ? '#e6fffa' : '#fff5f5',
            color: candidate.status === 'validated' ? '#2c7a7b' : '#c53030'
          }}>
            {candidate.status}
          </span>
        </p>
      </div>

      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button 
          onClick={handleValidate} 
          disabled={isValidating || candidate.status === 'validated'}
          style={{ 
            backgroundColor: (isValidating || candidate.status === 'validated') ? '#ccc' : '#4CAF50', 
            color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' 
          }}
        >
          {isValidating ? "Validation en cours..." : "Valider"}
        </button>

        <button 
          onClick={handleEditRedirect}
          style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Modifier
        </button>

        <button 
          onClick={handleDelete}
          style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Supprimer
        </button>
      </div>

      
      {showLoginNotice && (
        <div style={{ 
          backgroundColor: '#fff5f5', 
          padding: '15px', 
          border: '1px solid #feb2b2', 
          borderRadius: '5px', 
          marginBottom: '20px',
          textAlign: 'center' 
        }}>
          <p style={{ color: '#c53030', fontWeight: 'bold', marginBottom: '10px' }}>
            ⚠️ Vous devez vous connecter en tant qu'admin d'abord pour effectuer cette action.
          </p>
          <Link to="/login">
            <button style={{ 
              backgroundColor: '#646cff', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Se connecter maintenant
            </button>
          </Link>
        </div>
      )}

      <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'none' }}>← Retour à la liste</Link>
      </div>
    </div>
  );
};
