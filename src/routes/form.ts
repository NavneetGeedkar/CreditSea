import { Router } from 'express';
import { submitForm } from '../controllers/formControllers';
const router = Router();

router.post('/create-loan', submitForm);

export default router;