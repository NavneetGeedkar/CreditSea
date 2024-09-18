import { Request, Response } from 'express';
import { Form } from '../models/Form';

export const submitForm = async (req : Request,res : Response) => {
  try {
    
        const existingForm = await Form.findOne({ email: req.body.email });
        if (existingForm) {
          return res.status(400).json({ message: 'Email already exists' });
        }
    const newForm = new Form(req.body);
    await newForm.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form' });
  }
};