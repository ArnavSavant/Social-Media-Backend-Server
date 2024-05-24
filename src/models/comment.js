"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			// Define associations here
			Comment.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
			Comment.belongsTo(models.Post, {
				foreignKey: "post_id",
				as: "post",
			});
		}
	}

	Comment.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			post_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Posts",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);

	return Comment;
};
