"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("Follows", {
			fields: ["follower_id"],
			type: "foreign key",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
		await queryInterface.addConstraint("Follows", {
			fields: ["followed_id"],
			type: "foreign key",
			references: {
				table: "Users",
				field: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("Follows", "fk_follows_follower_id");
		await queryInterface.removeConstraint("Follows", "fk_follows_followed_id");
	},
};
