import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const token = jwt.sign({ id: '123', role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

console.log("Voici ton Token de test (copie tout) :\n");
console.log("Bearer " + token);
