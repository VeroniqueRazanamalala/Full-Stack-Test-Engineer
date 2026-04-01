import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import candidateRoutes from '../routes/candidateRoutes';
import cors from 'cors';
import { jest,describe, it, expect, beforeAll, afterAll } from '@jest/globals';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/candidates', candidateRoutes);

let mongoServer: MongoMemoryServer;
jest.setTimeout(600000);
describe('Tests d\'intégration - API Candidates', () => {
  
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });
afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});
  it('devrait créer un candidat via l\'API et retourner 201', async () => {
    const res = await request(app)
      .post('/api/candidates')
      .send({
        firstName: 'Integration',
        lastName: 'Test',
        email: 'test.integration@example.com'
      });

    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe('Integration');
  });

  it('devrait récupérer la liste des candidats', async () => {
    const res = await request(app).get('/api/candidates');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
