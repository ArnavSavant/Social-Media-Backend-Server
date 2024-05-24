const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { LikeRepository, PostRepository } = require("../repositories");
const likeRepository = new LikeRepository();
const postRepository = new PostRepository();
const AuthService = require("./auth-service");

async function likePost(data) {
	try {
		const isAuthorised = await AuthService.isAuthorised(data);
		if (!isAuthorised) {
			throw new AppError(
				"User is not authorised to like this post",
				StatusCodes.UNAUTHORIZED
			);
		}
		const hasLiked = await likeRepository.hasUserLikedPost(
			data.user_id,
			data.post_id
		);
		if (hasLiked) {
			throw new AppError(
				"User has already liked this post",
				StatusCodes.BAD_REQUEST
			);
		}
		const like = await likeRepository.create(data);
		const updatedPost = await postRepository.incrementLikes(data.post_id);

		return { like, updatedPost };
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
async function unlikePost(data) {
	try {
		const isAuthorised = await AuthService.isAuthorised(data);
		if (!isAuthorised) {
			throw new AppError(
				"User is not authorised to unlike this post",
				StatusCodes.UNAUTHORIZED
			);
		}

		const hasLiked = await likeRepository.hasUserLikedPost(
			data.user_id,
			data.post_id
		);

		if (!hasLiked) {
			throw new AppError(
				"User has not liked this post yet",
				StatusCodes.BAD_REQUEST
			);
		}

		await likeRepository.delete(data);
		const updatedPost = await postRepository.decrementLikes(data.post_id);

		return {updatedPost };
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

module.exports = {
	likePost,
	unlikePost,
};
