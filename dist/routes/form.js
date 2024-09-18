"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formControllers_1 = require("../controllers/formControllers");
const router = (0, express_1.Router)();
router.post('/create-loan', formControllers_1.submitForm);
exports.default = router;
