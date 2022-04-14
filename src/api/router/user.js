import express from "express";
import { session, user } from "#@src/api/middleware";

const router = express.Router();

router.get("/users", user.logged.yes, user.users);
router.post("/login", user.logged.no, user.login);
router.post("/logout", user.logged.yes, session.remove);
router.post("/register", user.logged.no, user.register);
router.post("/remove", user.logged.yes, user.remove);

export default router;
