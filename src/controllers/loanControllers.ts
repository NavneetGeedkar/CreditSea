import { Request, Response } from 'express';
import { Form } from '../models/Form';  // Import the Form model

// 1. PUT :Controller to update the loan request status
export const updateLoanStatus = async (req: Request, res: Response) => {
  const { loanId } = req.params;  
  const { status } = req.body;  

  // Ensure that the status is a valid value
  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(status.toLowerCase())) {  // Ensure case insensitivity
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Find the loan request by ID and update its status
    const loanRequest = await Form.findByIdAndUpdate(
      loanId,
      { status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() },  // Format status
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
  } catch (error) {
    console.error('Error updating loan request status:', error);
    res.status(500).json({ message: 'Server error while updating loan status' });
  }
};


// 2. GET : Controller to get all loan requests
export const getAllLoanRequests = async (req: Request, res: Response) => {
  try {
    // Find all loan requests in the Form collection
    const loanRequests = await Form.find();

    // Check if there are no loan requests
    if (!loanRequests.length) {
      return res.status(404).json({ message: 'No loan requests found' });
    }

    // Return the list of loan requests
    res.status(200).json({
      message: 'Loan requests retrieved successfully',
      loanRequests,
    });
  } catch (error) {
    console.error('Error retrieving loan requests:', error);
    res.status(500).json({ message: 'Server error while retrieving loan requests' });
  }
};

// 3. Controller to get all loan requests for a specific user by user ID 
export const getLoanRequestsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params; // Assume userId is passed in the URL

  try {
    // Find all loan requests where the user matches the given userId 
    const loanRequests = await Form.find({ _id: userId }); 

    // Check if no loan requests were found
    if (!loanRequests.length) {
      return res.status(404).json({ message: 'No loan requests found for this user' });
    }

    // Return the list of loan requests for the user
    res.status(200).json({
      message: 'Loan requests for the user retrieved successfully',
      loanRequests,
    });
  } catch (error) {
    console.error('Error retrieving loan requests for user:', error);
    res.status(500).json({ message: 'Server error while retrieving loan requests for user' });
  }
};
