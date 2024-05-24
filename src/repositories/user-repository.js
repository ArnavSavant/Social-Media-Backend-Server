const CrudRepository = require("./crud-repository");

const { User } = require("../models");

class UserRepository extends CrudRepository {
	constructor() {
		super(User);
	}

	async getUserByEmail(email) {
		const user = await User.findOne({
			where: {
				email: email,
			},
		});
		return user;
	}
	async getUserByName(name) {
		const user = await User.findOne({
			where: {
				name: name,
			},
		});
		return user;
	}
	async getUserByUsername(username) {
		const user = await User.findOne({
			where: {
				username: username,
			},
		});
		return user;
	}
}

module.exports = UserRepository;
