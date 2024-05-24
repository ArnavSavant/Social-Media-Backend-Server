const express = require("express");
const router = express.Router();
const { authController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.post(
	"/signup",
	authMiddleware.validateSignUpRequest,
	authController.signup
);

router.post(
	"/signin",
	authMiddleware.validateAuthRequest,
	authController.signin
);

module.exports = router;
