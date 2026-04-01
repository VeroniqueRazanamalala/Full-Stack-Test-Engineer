import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const schema = z.object({
  firstName: z.string().min(2, "Le prénom doit faire au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string()
    .email("Format d'email invalide")
    .transform((val) => val.toLowerCase().trim()),
});

export const CandidateForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (isEditMode) {
      api.get(`/candidates/${id}`)
        .then(res => reset(res.data))
        .catch(err => console.error("Erreur lors du chargement des données", err));
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (isEditMode) {
        await api.put(`/candidates/${id}`, data);
        alert("Candidat mis à jour avec succès !");
      } else {
        await api.post('/candidates', data);
        alert("Candidat créé avec succès !");
      }
      navigate('/'); 
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'enregistrement";
      alert(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>{isEditMode ? "📝 Modifier le Candidat" : "👤 Ajouter un Candidat"}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Prénom</label>
          <input 
            {...register("firstName")} 
            placeholder="Ex: Jean" 
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.firstName && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{errors.firstName.message as string}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nom</label>
          <input 
            {...register("lastName")} 
            placeholder="Ex: Dupont" 
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.lastName && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{errors.lastName.message as string}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email (sera converti en minuscules)</label>
          <input 
            {...register("email")} 
            placeholder="Ex: jean.dupont@test.com" 
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{errors.email.message as string}</p>}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="submit" 
            style={{ 
              flex: 1, 
              backgroundColor: '#646cff', 
              color: 'white', 
              border: 'none', 
              padding: '10px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            {isEditMode ? "Mettre à jour" : "Enregistrer"}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            style={{ 
              flex: 1, 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '10px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Annuler
          </button>
        </div>

      </form>
    </div>
  );
};
