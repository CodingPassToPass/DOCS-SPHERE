import { Router } from "express";
import user from "./user.route.js";
import auth from "./auth.route.js";
import document from "./document.route.js";
const router = Router();
router.use("/user", user);
router.use("/auth", auth);
router.use("/document", document);
export default router;
