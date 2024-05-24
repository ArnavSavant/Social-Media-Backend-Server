const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const { AuthService } = require("../services");
function validateSignUpRequest(req, res, next) {
    if (!req.body.name) {
			ErrorResponse.messages =
				"Something went wrong while registering the user";
			ErrorResponse.error = new AppError(
				["Name not found in the incoming request in the correct form"],
				StatusCodes.BAD_REQUEST
			);
			return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
		}if (!req.body.username) {
			ErrorResponse.messages =
				"Something went wrong while registering the user";
			ErrorResponse.error = new AppError(
				["Umail not found in the incoming request in the correct form"],
				StatusCodes.BAD_REQUEST
			);
			return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
		}
	if (!req.body.email) {
		ErrorResponse.messages =
			"Something went wrong while registering the user";
		ErrorResponse.error = new AppError(
			["Email not found in the incoming request in the correct form"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	if (!req.body.password) {
		ErrorResponse.messages =
			"Something went wrong while registering the user";
		ErrorResponse.error = new AppError(
			["Password not found in the incoming request in the correct form"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}


function validateAuthRequest(req, res, next) {
	if (!req.body.username) {
		ErrorResponse.messages = "Something went wrong while authenticating the user";
		ErrorResponse.error = new AppError(
			["UserName not found in the incoming request in the correct form"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	if (!req.body.password) {
		ErrorResponse.messages = "Something went wrong while authenticating the user";
		ErrorResponse.error = new AppError(
			["Password not found in the incoming request in the correct form"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}
async function checkAuthentication(req, res, next) {
	try {
		const response = await AuthService.isAuthenticated(
			req.headers["x-access-token"]
		);
		if (response) {
			req.user = response;
			next();
		}
	} catch (error) {
		return res.status(error.statusCode).json(error);
	}
}

module.exports = {
	validateSignUpRequest,
	validateAuthRequest,
	checkAuthentication,
};
