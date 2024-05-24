const CrudRepository = require("./crud-repository");

const { Comment } = require("../models");

class CommentRepository extends CrudRepository {
	constructor() {
		super(Comment);
	}
	async hasUserCommentedOnThePost(userId, postId) {
		const comment = await this.model.findOne({
			where: {
				user_id: userId,
				post_id: postId,
			},
		});
		return comment !== null;
	}
	
	async getAllComments(postId) {
		const comments = await this.model.findAll({
			where: {
				post_id: postId,
			},
		});
		return comments;
	}
}

module.exports = CommentRepository;
