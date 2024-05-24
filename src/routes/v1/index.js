const express = require("express");

const router = express.Router();

const { infoController } = require("../../controllers");
const authRoutes = require("./auth-routes");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

router.get("/info", infoController.info);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
