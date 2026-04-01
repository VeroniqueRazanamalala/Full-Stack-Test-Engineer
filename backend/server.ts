import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import candidateRoutes from './routes/candidateRoutes'; 
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', authRoutes); 


app.use('/api/candidates', candidateRoutes);
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI || "";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(err => console.error("Erreur de connexion :", err));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: "Trop de requêtes, réessayez plus tard."
});
//app.use(limiter); 
app.get('/', (req, res) => {
  res.send("L'API Candidates est en ligne !");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
