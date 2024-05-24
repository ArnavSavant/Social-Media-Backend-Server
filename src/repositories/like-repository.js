const CrudRepository = require("./crud-repository");
const { Like } = require("../models");

class LikeRepository extends CrudRepository {
	constructor() {
		super(Like);
	}
	async hasUserLikedPost(userId, postId) {
		const like = await this.model.findOne({
			where: {
				user_id: userId,
				post_id: postId,
			},
		});
		return like !== null;
	}
}

module.exports = LikeRepository;
