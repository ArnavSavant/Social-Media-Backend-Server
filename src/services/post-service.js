const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { PostRepository, FollowRepository } = require("../repositories");
const CommentService = require("./comment-service");
const followRepository = new FollowRepository();
const postRepository = new PostRepository();
const { Op } = require("sequelize");

async function createPost(data) {
	try {
		const post = await postRepository.create({
			user_id: data.user_id,
			content: data.content,
			media_url: data.media_url,
			commentsEnabled: data.commentsEnabled,
			isPublished: true,
		});
		return post;
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
async function schedulePost(data) {
	try {
		const post = await postRepository.create({
			user_id: data.user_id,
			content: data.content,
			media_url: data.media_url,
			scheduledAt: data.scheduledAt,
			isPublished: false,
			commentsEnabled: data.commentsEnabled,
		});
		return post;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function deletePost(data) {
	try {
		const userPosts = await postRepository.getAllPosts([data.user_id]);
		const userPostsId = userPosts.map((post) => {
			return post.dataValues.id;
		});

		if (!userPostsId.includes(parseInt(data.post_id, 10))) {
			throw new AppError(
				"User is not authorised to delete the post",
				StatusCodes.UNAUTHORIZED
			);
		}
		const post = await postRepository.delete(data.post_id);
		return post;
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

async function getFeed(data) {
	try {
		const followed_list = await followRepository.getFollowedUserIdsByUserId(
			data.user_id
		);

		const followedUserIds = followed_list.map((follow) => {
			return follow.dataValues.followed_id;
		});
		const feed = await postRepository.getAllPosts(followedUserIds);
		const selfPosts = await postRepository.getAllPosts([data.user_id]);
		return { feed, selfPosts };
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
async function getPostDetails(data) {
	try {
		const postDetails = await postRepository.get(data.post_id);
		if (!postDetails) {
			throw new AppError("Post does not exist", StatusCodes.BAD_REQUEST);
		}
		const comments = await CommentService.getAllComments(data);
		return { postDetails, comments };
	} catch (error) {
		console.log(error);
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function publishScheduledPosts() {
	try {
		const now = new Date();
		const scheduledPosts = await postRepository.findAll({
			where: {
				scheduledAt: {
					[Op.lte]: now,
				},
				isPublished: false,
			},
		});

		for (const post of scheduledPosts) {
			post.isPublished = true;
			await post.save();
		}
	} catch (error) {
		console.log(error);
		throw new AppError(
			"Something went wrong while publishing the posts",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createPost,
	getFeed,
	deletePost,
	getPostDetails,
	publishScheduledPosts,
	schedulePost,
};
