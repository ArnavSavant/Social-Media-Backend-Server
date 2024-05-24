const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { CommentRepository, PostRepository } = require("../repositories");
const commentRepository = new CommentRepository();
const postRepository = new PostRepository();
const AuthService = require("./auth-service");

async function createComment(data) {
	try {
		const isAuthorised = await AuthService.isAuthorised(data);
		const selfPost = await postRepository.get(data.post_id);
		if (!isAuthorised && selfPost.dataValues.id !== data.user_id) {
			throw new AppError(
				"User is not authorised to comment on this post",
				StatusCodes.UNAUTHORIZED
			);
		}
		if (!selfPost.commentsEnabled) {
			throw new AppError(
				"Comments are disabled for this post",
				StatusCodes.FORBIDDEN
			);
		}
		const hasCommented = await commentRepository.hasUserCommentedOnThePost(
			data.user_id,
			data.post_id
		);
		if (hasCommented) {
			throw new AppError(
				"User has already commented on this post",
				StatusCodes.BAD_REQUEST
			);
		}
		await commentRepository.create(data);
		const updatedPost = await postRepository.incrementComments(data.post_id);

		return { updatedPost };
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		console.log(error);
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function deleteComment(data) {
	try {
		const isAuthorised = await AuthService.isAuthorised(data);
		const selfPost = await postRepository.get(data.post_id);
		if (!isAuthorised && selfPost.dataValues.id !== data.user_id) {
			throw new AppError(
				"User is not authorised to un-comment on this post",
				StatusCodes.UNAUTHORIZED
			);
		}
		const hasCommented = await commentRepository.hasUserCommentedOnThePost(
			data.user_id,
			data.post_id
		);
		if (!hasCommented) {
			throw new AppError(
				"User has not yet commented on this post",
				StatusCodes.BAD_REQUEST
			);
		}
		await commentRepository.delete(data);
		const updatedPost = await postRepository.decrementComments(data.post_id);

		return { updatedPost };
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		console.log(error);
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function updateComment(data) {
	try {
		const comment = await commentRepository.get(data.comment_id);
		if (comment.dataValues.user_id !== data.user_id) {
			throw new AppError(
				"User is not authorised to modify this comment",
				StatusCodes.UNAUTHORIZED
			);
		}
		const updatedComment = await commentRepository.update(data, comment.id);
		return updatedComment;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		console.log(error);
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAllComments(data) {
	try {
		const comments = await commentRepository.getAllComments(data.post_id);
		return comments;
	} catch (error) {
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
module.exports = {
	createComment,
	deleteComment,
	updateComment,
	getAllComments,
};
