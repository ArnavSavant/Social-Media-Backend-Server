"use strict";
const { Model } = require("sequelize");
const { serverConfig } = require("../config");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.belongsToMany(models.User, {
				through: models.Follow,
				as: "Followers",
				foreignKey: "followed_id",
				otherKey: "follower_id",
			});

			User.belongsToMany(models.User, {
				through: models.Follow,
				as: "Following",
				foreignKey: "follower_id",
				otherKey: "followed_id",
			});

			User.hasMany(models.Post, {
				foreignKey: "user_id",
				as: "posts",
			});

			User.hasMany(models.Like, {
				foreignKey: "user_id",
				as: "likes",
			});
			User.hasMany(models.Comment, {
				foreignKey: "user_id",
				as: "comments",
			});
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	User.beforeCreate(async function encrypt(user) {
		const encryptedPassword = await bcrypt.hashSync(
			user.password,
			serverConfig.SALT_ROUNDS
		);
		user.password = encryptedPassword;
	});
	return User;
};
