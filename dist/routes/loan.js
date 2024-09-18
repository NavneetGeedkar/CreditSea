"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanControllers_1 = require("../controllers/loanControllers");
const loanControllers_2 = require("../controllers/loanControllers");
const loanControllers_3 = require("../controllers/loanControllers");
const router = (0, express_1.Router)();
// Route to update loan request status (PUT)
router.put('/loan/:loanId/status', loanControllers_1.updateLoanStatus);
// Route to get all loan requests
router.get('/loan/requests', loanControllers_2.getAllLoanRequests);
// Route to get all loan requests for a specific user
router.get('/loan/requests/:userId', loanControllers_3.getLoanRequestsByUser);
exports.default = router;
