import { Router } from 'express';
import { getDashboardStatistics } from '../controllers/dashboardControllers'
const router = Router();

router.get('/stats', getDashboardStatistics);

export default router;
