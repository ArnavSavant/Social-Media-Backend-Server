"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			Post.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
			Post.hasMany(models.Like, {
				foreignKey: "post_id",
				as: "likes",
			});
			Post.hasMany(models.Comment, {
				foreignKey: "post_id",
				as: "comments",
			});
		}
	}

	Post.init(
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
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			media_url: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			noOfLikes: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			noOfComments: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			commentsEnabled: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
			scheduledAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			isPublished: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);

	return Post;
};
