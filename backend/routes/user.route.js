import { Router } from "express";
import { getUsers, login, logout, profile, register, updateProfile } from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,profile)
router.route("/profile/update").put(isAuthenticated,updateProfile);
router.route("/bulk").get(isAuthenticated,getUsers);

export default router;