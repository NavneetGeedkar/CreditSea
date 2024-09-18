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
exports.submitForm = void 0;
const Form_1 = require("../models/Form");
const submitForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingForm = yield Form_1.Form.findOne({ email: req.body.email });
        if (existingForm) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newForm = new Form_1.Form(req.body);
        yield newForm.save();
        res.status(200).json({ message: 'Form submitted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error submitting form' });
    }
});
exports.submitForm = submitForm;
