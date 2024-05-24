const express = require("express");
const router = express.Router();
const { postController, likeController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.post(
	"/create",
	authMiddleware.checkAuthentication,
	postController.createPost
);

router.post(
	"/schedule",
	authMiddleware.checkAuthentication,
	postController.schedulePost
);

router.post(
	"/delete",
	authMiddleware.checkAuthentication,
	postController.deletePost
);

router.get("/feed", authMiddleware.checkAuthentication, postController.getFeed);

router.get("/details", authMiddleware.checkAuthentication, postController.getPostDetails);

router.post(
	"/like",
	authMiddleware.checkAuthentication,
	likeController.likePost
);

router.post(
	"/unlike",
	authMiddleware.checkAuthentication,
	likeController.unlikePost
);

module.exports = router;
