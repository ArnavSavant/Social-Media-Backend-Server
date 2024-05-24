"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Follow extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Define associations here
			Follow.belongsTo(models.User, {
				as: "Follower",
				foreignKey: "follower_id",
			});
			Follow.belongsTo(models.User, {
				as: "Followed",
				foreignKey: "followed_id",
			});
		}
	}
	Follow.init(
		{
			follower_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			followed_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "Follow",
		}
	);
	return Follow;
};
