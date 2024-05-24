const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");
const {
	UserRepository,
	PostRepository,
	FollowRepository,
} = require("../repositories");
const userRepository = new UserRepository();
const followRepository = new FollowRepository();
const postRepository = new PostRepository();
async function createUser(data) {
	try {
		const user = await userRepository.create(data);
		return user;
	} catch (error) {
		console.log(error);
		if (
			error.name == "SequelizeValidationError" ||
			error.name == "SequelizeUniqueConstraintError"
		) {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot Create an User",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function signIn(data) {
	try {
		const user = await userRepository.getUserByUsername(data.username);
		if (!user) {
			throw new AppError(
				"User not found with following username",
				StatusCodes.NOT_FOUND
			);
		}
		const passwordMatch = Auth.checkPassword(data.password, user.password);
		if (!passwordMatch) {
			throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);
		}
		const jwt = Auth.createToken({ id: user.id, username: user.username });
		return jwt;
	} catch (error) {
		console.log(error);
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function isAuthenticated(token) {
	try {
		if (!token) {
			throw new AppError("JWT token missing", StatusCodes.BAD_REQUEST);
		}
		const response = Auth.verifyToken(token);
		const user = await userRepository.get(response.id);
		if (!user) {
			throw new AppError("No user found", StatusCodes.NOT_FOUND);
		}
		return user.id;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		if (error.name == "JsonWebTokenError") {
			throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
		}
		console.log(error);
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function isAuthorised(data) {
	try {
		const followed_list = await followRepository.getFollowedUserIdsByUserId(
			data.user_id
		);

		const followedUserIds = followed_list.map(
			(follow) => follow.dataValues.followed_id
		);
		const userPosts = await postRepository.getAllPosts([
			...followedUserIds,
			data.user_id,
		]);
		const userPostIds = userPosts.map((post) => post.id);

		return userPostIds.includes(parseInt(data.post_id, 10));
	} catch (error) {
		console.log(error);
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createUser,
	signIn,
	isAuthenticated,
	isAuthorised,
};
