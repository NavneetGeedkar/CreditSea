"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const form_1 = __importDefault(require("./routes/form"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const loan_1 = __importDefault(require("./routes/loan"));
const app = (0, express_1.default)();
const PORT = 5000;
let db;
//Connection to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/credit-app').then(() => console.log('Database connected'))
    .catch((err) => console.error('DB connection error:', err));
//Middleware
app.use(express_1.default.json());
//Routes
//1.to create loan request POST method
app.use('/api/form', form_1.default);
//2. to display stats 
app.use('/api/dashboard', dashboard_1.default);
//3.Update the status Loan Request/ get specific loan request by id / get all loan request
app.use('/api', loan_1.default);
//Page Not Found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Page Not Found'
    });
});
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
