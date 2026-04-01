import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_par_defaut');
    (req as any).user = decoded;
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};
