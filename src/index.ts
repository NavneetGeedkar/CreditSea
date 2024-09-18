import express from "express"
import mongoose from 'mongoose';
import formRoutes from './routes/form'
import dashboardRoutes from './routes/dashboard'
import loanRoutes from './routes/loan'
import path from 'path'

const app = express()

const PORT = 5000

let db: any
 //Connection to MongoDB
mongoose.connect('mongodb://localhost:27017/credit-app').then(() => console.log('Database connected'))
.catch((err) => console.error('DB connection error:', err));

//Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

//Routes
//1.to create loan request POST method
app.use('/api/form', formRoutes)
//2. to display stats 
app.use('/api/dashboard', dashboardRoutes)
//3.Update the status Loan Request/ get specific loan request by id / get all loan request
app.use('/api', loanRoutes);  
//Page Not Found
app.use((req, res, next) => {
    res.status(404).json({ 
    message: 'Page Not Found' });
  });
          

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})