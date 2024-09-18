"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: String,
        required: true,
    },
    tenure: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    employementStatus: {
        type: String,
        require: true,
    },
    employementAddress: {
        type: String,
        require: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: "String",
        default: 'Pending'
    }
});
exports.Form = mongoose_1.default.model('Form', formSchema);
