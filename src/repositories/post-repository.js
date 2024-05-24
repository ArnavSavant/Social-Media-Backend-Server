const CrudRepository = require("./crud-repository");
const { Op } = require("sequelize");
const { Post } = require("../models");

class PostRepository extends CrudRepository {
	constructor() {
		super(Post);
	}

	async getAllPosts(userIds) {
		return this.model.findAll({
			where: {
				user_id: {
					[Op.in]: userIds,
				},
			},
			order: [["createdAt", "DESC"]],
		});
	}
	async incrementLikes(postId) {
		return this.model.increment("noOfLikes", {
			by: 1,
			where: { id: postId },
		});
	}
	async decrementLikes(postId) {
		return this.model.decrement("noOfLikes", {
			by: 1,
			where: { id: postId },
		});
	}
	async incrementComments(postId) {
		return this.model.increment("noOfComments", {
			by: 1,
			where: { id: postId },
		});
	}
	async decrementComments(postId) {
		return this.model.decrement("noOfComments", {
			by: 1,
			where: { id: postId },
		});
	}
	async findAll(options) {
		return this.model.findAll(options);
	}
}

module.exports = PostRepository;
