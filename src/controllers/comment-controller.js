const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const { CommentService } = require("../services");
async function createComment(req, res) {
	try {
		const response = await CommentService.createComment({
			user_id: req.user,
			post_id: req.query.id,
			content: req.body.content,
		});
		SuccessResponse.messages = "Commented SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function deleteComment(req, res) {
	try {
		const response = await CommentService.deleteComment({
			user_id: req.user,
			post_id: req.query.id,
		});
		SuccessResponse.messages = "Comment Deleted SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function updateComment(req, res) {
	try {
		const response = await CommentService.updateComment({
			user_id: req.user,
			comment_id: req.query.id,
			content: req.body.content,
		});
		SuccessResponse.messages = "Comment Updated SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	createComment,
	deleteComment,
	updateComment,
};
