const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { UserRepository, FollowRepository } = require("../repositories");
const userRepository = new UserRepository();
const followRepository = new FollowRepository();

async function searchUser(username) {
	try {
		const user = await userRepository.getUserByUsername(username);
		if (!user) {
			throw new AppError(
				"User does not exist with the following username",
				StatusCodes.NOT_FOUND
			);
		}
		return { name: user.name, username: user.username };
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
async function followUser(data) {
	try {
		const user = await userRepository.getUserByUsername(data.username);
		if (!user) {
			throw new AppError(
				"User does not exist with the following username",
				StatusCodes.NOT_FOUND
			);
		}
		const followData = {
			followed_id: user.id,
			follower_id: data.follower_id,
		};
		const response = await followRepository.create(followData);
		return response;
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
	searchUser,
	followUser,
};
