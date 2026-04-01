import { Router } from 'express';
import { 
  createCandidate, 
  getAllCandidates, 
  updateCandidate, 
  deleteCandidate, 
  validateCandidate,
  getCandidateById
} from '../controllers/candidateController';
import { protect } from '../middlewares/authMiddleware'; 

const router = Router();

router.post('/', createCandidate);
router.get('/', getAllCandidates);

router.put('/:id', protect, updateCandidate);
router.delete('/:id',protect, deleteCandidate);
router.post('/:id/validate', /* protect*/ validateCandidate); 
router.get('/:id', getCandidateById);

export default router;
