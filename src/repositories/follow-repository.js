const CrudRepository = require("./crud-repository");

const { Follow } = require("../models");

class FollowRepository extends CrudRepository {
	constructor() {
		super(Follow);
	}
	async getFollowedUserIdsByUserId(userId) {
		return this.model.findAll({
			where: { follower_id: userId },
			attributes: ["followed_id"],
		});
	}
}

module.exports = FollowRepository;
