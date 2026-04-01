import { Request, Response } from 'express';
import Candidate from '../models/Candidate';

// POST
export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;

    
    const newCandidate = new Candidate({
      firstName,
      lastName,
      email: email.toLowerCase().trim()
    });

    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error: any) {
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Cet email est déjà utilisé par un autre candidat." 
      });
    }
    res.status(400).json({ message: "Erreur de validation", error: error.message });
  }
};

// GET 
export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find({ isDeleted: false });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération" });
  }
};

// GET 
export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate || candidate.isDeleted) {
      return res.status(404).json({ message: "Candidat introuvable" });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: "ID invalide ou erreur serveur" });
  }
};

// PUT 
export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.email) data.email = data.email.toLowerCase().trim();

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, data, { new: true });
    if (!updatedCandidate) return res.status(404).json({ message: "Candidat introuvable" });

    res.json(updatedCandidate);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Cet email appartient déjà à un autre candidat." });
    }
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
};

// DELETE 
export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id, 
      { isDeleted: true }, 
      { new: true }
    );
    if (!candidate) return res.status(404).json({ message: "Candidat introuvable" });
    res.json({ message: "Candidat supprimé avec succès (archivé)." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

export const validateCandidate = async (req: Request, res: Response) => {
  try {
    setTimeout(async () => {
      const candidate = await Candidate.findByIdAndUpdate(
        req.params.id, 
        { status: 'validated' }, 
        { new: true }
      );
      if (!candidate) return res.status(404).json({ message: "Candidat introuvable" });
      res.json(candidate);
    }, 2000);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la validation" });
  }
};
