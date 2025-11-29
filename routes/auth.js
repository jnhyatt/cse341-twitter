import express from "express";
import passport from "../config/oauth.js";

const router = express.Router();

router.get("/login", passport.authenticate("google", { scope: ["openid"] }));
router.get("/callback", passport.authenticate("google", { failureRedirect: "/auth/login" }), (req, res) => {
    res.redirect("/me");
});
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/me");
    });
});

export default router;
