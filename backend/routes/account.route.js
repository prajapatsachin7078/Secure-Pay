import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getBalance, getTransactionHistory, recordTransaction, transferFunds } from "../controller/account.controller.js";
const router = Router();

router.route("/balance").get(isAuthenticated, getBalance);
router.route("/transfer").post(isAuthenticated, transferFunds,recordTransaction);
router.route("/transactions").get(isAuthenticated,getTransactionHistory);
export default router;