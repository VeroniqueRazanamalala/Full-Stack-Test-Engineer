import mongoose from 'mongoose';

import Candidate from '../models/Candidate'; 
import { describe, it, expect } from '@jest/globals';

describe('Candidate Model Test', () => {
  
  it('devrait créer un candidat avec succès', async () => {
    const candidateData = {
      firstName: 'Raza',
      lastName: 'Vero',
      email: 'veronique@gmail.com'
    };
    const validCandidate = new Candidate(candidateData);
    
    expect(validCandidate.firstName).toBe(candidateData.firstName);
    expect(validCandidate.status).toBe('pending'); 
  });

  it('devrait échouer si l\'email est manquant', async () => {
    const candidateWithoutEmail = new Candidate({ firstName: 'Jean' });
    let err;
    try {
      await candidateWithoutEmail.validate();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
  });
});
