const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const { LikeService } = require("../services");

async function likePost(req, res) {
	try {
		const response = await LikeService.likePost({
			user_id: req.user,
			post_id: req.query.id,
		});
		SuccessResponse.messages = "Post Liked SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function unlikePost(req, res) {
	try {
		const response = await LikeService.unlikePost({
			user_id: req.user,
			post_id: req.query.id,
		});
		SuccessResponse.messages = "Post Unliked SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	likePost,
	unlikePost,
};