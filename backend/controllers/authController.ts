import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  if (email === 'admin@test.com' && password === 'admin123') {

    const token = jwt.sign(
      { id: 'admin_id' }, 
      process.env.JWT_SECRET || 'secret_par_defaut', 
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }
  res.status(401).json({ message: "Identifiants invalides" });
};
