import { Request, Response } from 'express';
import { Form } from '../models/Form'; // Assume you have a Form model for form submissions

// Controller to get loan statistics for the dashboard
export const getDashboardStatistics = async (req: Request, res: Response) => {
  try {
    // Total number of loan requests
    const totalLoans = await Form.countDocuments();

    // Total number of approved loans
    const approvedLoans = await Form.countDocuments({ status: 'Approved' });

    // Total number of disbursed loans
    const disbursedLoans = await Form.countDocuments({ status: 'Disbursed' });

    // Total amount disbursed for loans with status 'Disbursed'
    const totalDisbursed = await Form.aggregate([
      { $match: { status: 'Disbursed' } },  // Filter for disbursed loans
      { $group: { _id: null, total: { $sum: "$amount" } } }  // Sum the 'amount' field
    ]);
    // Get the most recent 5 form submissions
    const recentSubmissions = await Form.find()
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
  } catch (error) {
    console.error('Error retrieving loan statistics:', error);
    res.status(500).json({ message: 'Server error while retrieving loan statistics' });
  }
};



