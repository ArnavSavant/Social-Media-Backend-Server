const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const { AuthService } = require("../services");

async function signup(req, res) {
	try {
		const user = await AuthService.createUser({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		SuccessResponse.messages = "User Created SuccessFully";
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function signin(req, res) {
	try {
		const user = await AuthService.signIn({
			username: req.body.username,
			password: req.body.password,
		});
		SuccessResponse.messages = "Sign In Successfully";
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
module.exports = {
    signup,
	signin
}
