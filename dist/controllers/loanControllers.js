"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanRequestsByUser = exports.getAllLoanRequests = exports.updateLoanStatus = void 0;
const Form_1 = require("../models/Form"); // Import the Form model
// 1. PUT :Controller to update the loan request status
const updateLoanStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loanId } = req.params;
    const { status } = req.body;
    // Ensure that the status is a valid value
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status.toLowerCase())) { // Ensure case insensitivity
        return res.status(400).json({ message: 'Invalid status value' });
    }
    try {
        // Find the loan request by ID and update its status
        const loanRequest = yield Form_1.Form.findByIdAndUpdate(loanId, { status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() }, // Format status
        { new: true } // Return the updated document
        );
        if (!loanRequest) {
            return res.status(404).json({ message: 'Loan request not found' });
        }
        // Return the updated loan request
        res.status(200).json({
            message: 'Loan request status updated successfully',
            loanRequest,
        });
    }
    catch (error) {
        console.error('Error updating loan request status:', error);
        res.status(500).json({ message: 'Server error while updating loan status' });
    }
});
exports.updateLoanStatus = updateLoanStatus;
// 2. GET : Controller to get all loan requests
const getAllLoanRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all loan requests in the Form collection
        const loanRequests = yield Form_1.Form.find();
        // Check if there are no loan requests
        if (!loanRequests.length) {
            return res.status(404).json({ message: 'No loan requests found' });
        }
        // Return the list of loan requests
        res.status(200).json({
            message: 'Loan requests retrieved successfully',
            loanRequests,
        });
    }
    catch (error) {
        console.error('Error retrieving loan requests:', error);
        res.status(500).json({ message: 'Server error while retrieving loan requests' });
    }
});
exports.getAllLoanRequests = getAllLoanRequests;
// 3. Controller to get all loan requests for a specific user by user ID 
const getLoanRequestsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params; // Assume userId is passed in the URL
    try {
        // Find all loan requests where the user matches the given userId 
        const loanRequests = yield Form_1.Form.find({ _id: userId });
        // Check if no loan requests were found
        if (!loanRequests.length) {
            return res.status(404).json({ message: 'No loan requests found for this user' });
        }
        // Return the list of loan requests for the user
        res.status(200).json({
            message: 'Loan requests for the user retrieved successfully',
            loanRequests,
        });
    }
    catch (error) {
        console.error('Error retrieving loan requests for user:', error);
        res.status(500).json({ message: 'Server error while retrieving loan requests for user' });
    }
});
exports.getLoanRequestsByUser = getLoanRequestsByUser;
