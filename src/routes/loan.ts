import { Router } from 'express';
import { updateLoanStatus } from '../controllers/loanControllers';
import { getAllLoanRequests } from '../controllers/loanControllers';
import { getLoanRequestsByUser } from '../controllers/loanControllers';
const router = Router();

// Route to update loan request status (PUT)
router.put('/loan/:loanId/status', updateLoanStatus);

// Route to get all loan requests
router.get('/loan/requests', getAllLoanRequests);


// Route to get all loan requests for a specific user
router.get('/loan/requests/:userId', getLoanRequestsByUser);



export default router;
