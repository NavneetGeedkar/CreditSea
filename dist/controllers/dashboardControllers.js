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
exports.getDashboardStatistics = void 0;
const Form_1 = require("../models/Form"); // Assume you have a Form model for form submissions
// Controller to get loan statistics for the dashboard
const getDashboardStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Total number of loan requests
        const totalLoans = yield Form_1.Form.countDocuments();
        // Total number of approved loans
        const approvedLoans = yield Form_1.Form.countDocuments({ status: 'Approved' });
        // Total number of disbursed loans
        const disbursedLoans = yield Form_1.Form.countDocuments({ status: 'Disbursed' });
        // Total amount disbursed for loans with status 'Disbursed'
        const totalDisbursed = yield Form_1.Form.aggregate([
            { $match: { status: 'Disbursed' } }, // Filter for disbursed loans
            { $group: { _id: null, total: { $sum: "$amount" } } } // Sum the 'amount' field
        ]);
        // Get the most recent 5 form submissions
        const recentSubmissions = yield Form_1.Form.find()
            .sort({ submissionDate: -1 })
            .limit(3);
        // Return the statistics as a JSON response
        res.status(200).json({
            total_loans: totalLoans,
            approved_loans: approvedLoans,
            disbursed_loans: disbursedLoans,
            total_disbursed: totalDisbursed.length > 0 ? totalDisbursed[0].total : 0,
            recentSubmissions,
        });
    }
    catch (error) {
        console.error('Error retrieving loan statistics:', error);
        res.status(500).json({ message: 'Server error while retrieving loan statistics' });
    }
});
exports.getDashboardStatistics = getDashboardStatistics;
