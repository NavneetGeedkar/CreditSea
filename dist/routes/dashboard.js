"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardControllers_1 = require("../controllers/dashboardControllers");
const router = (0, express_1.Router)();
router.get('/stats', dashboardControllers_1.getDashboardStatistics);
exports.default = router;
