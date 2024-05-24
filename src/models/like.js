"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		static associate(models) {
			Like.belongsTo(models.User, {
				foreignKey: "user_id",
				as: "user",
			});
			Like.belongsTo(models.Post, {
				foreignKey: "post_id",
				as: "post",
			});
		}
	}

	Like.init(
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
		},
		{
			sequelize,
			modelName: "Like",
		}
	);

	return Like;
};
