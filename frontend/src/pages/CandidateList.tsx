import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 5; 

  useEffect(() => {
    api.get('/candidates')
      .then(res => {
        setCandidates(res.data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur :", err));
  }, []);

  const filteredCandidates = candidates.filter((c: any) =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Liste des Candidats</h1>

      <input 
        type="text" 
        placeholder="Rechercher un nom..." 
        style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
        onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentCandidates.map((c: any) => (
          <li key={c._id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          
            <Link to={`/candidate/${c._id}`} style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
              {c.firstName} {c.lastName}
            </Link> 
            {" "}- {c.email}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Précédent
        </button>
        <span>Page {currentPage}</span>
        <button 
          disabled={indexOfLastCandidate >= filteredCandidates.length} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
