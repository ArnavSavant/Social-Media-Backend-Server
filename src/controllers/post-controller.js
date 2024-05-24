const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const { PostService } = require("../services");

async function createPost(req, res) {
	try {
		const response = await PostService.createPost({
			user_id: req.user,
			content: req.body.content,
			media_url: req.body.media_url || "NULL",
			commentsEnabled: req.body.commentsEnabled || false,
		});
		SuccessResponse.messages = "Post Created SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function schedulePost(req, res) {
	try {
		const response = await PostService.schedulePost({
			user_id: req.user,
			content: req.body.content,
			media_url: req.body.media_url || null,
			scheduledAt: req.body.scheduledAt,
			commentsEnabled: req.body.commentsEnabled || true,
		});
		SuccessResponse.messages = "Post scheduled successfully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res
			.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
			.json(ErrorResponse);
	}
}
async function deletePost(req, res) {
	try {
		const response = await PostService.deletePost({
			user_id: req.user,
			post_id: req.query.id,
		});
		SuccessResponse.messages = "Post Deleted SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function getFeed(req, res) {
	try {
		const response = await PostService.getFeed({
			user_id: req.user,
		});
		SuccessResponse.messages = "Feed Fetched SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function getPostDetails(req, res) {
	try {
		const response = await PostService.getPostDetails({
			post_id: req.query.id,
		});
		SuccessResponse.messages = "Post Details Fetched SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	createPost,
	getFeed,
	deletePost,
	getPostDetails,
	schedulePost,
};
