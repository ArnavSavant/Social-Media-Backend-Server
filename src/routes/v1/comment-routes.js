const express = require("express");
const router = express.Router();
const { commentController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.post(
	"/create",
	authMiddleware.checkAuthentication,
	commentController.createComment
);

router.post(
	"/delete",
	authMiddleware.checkAuthentication,
	commentController.deleteComment
);

router.post(
	"/update",
	authMiddleware.checkAuthentication,
	commentController.updateComment
);

module.exports = router;
