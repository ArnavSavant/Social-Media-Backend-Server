const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const { UserService } = require("../services");

async function searchUser(req, res) {
	try {
		const user = await UserService.searchUser(req.body.username);
		SuccessResponse.messages = "User Fetched SuccessFully";
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function followUser(req, res) {
	try {
		const response = await UserService.followUser({
			username: req.body.username,
			follower_id: req.user,
		});
		SuccessResponse.messages = "User Followed SuccessFully";
		SuccessResponse.data = response;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	searchUser,
	followUser,
};
