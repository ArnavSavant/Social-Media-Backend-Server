const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.get(
	"/search",
	authMiddleware.checkAuthentication,
	userController.searchUser
);

router.post(
	"/follow",
	authMiddleware.checkAuthentication,
	userController.followUser
);

module.exports = router;
