"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Posts", "scheduledAt", {
			type: Sequelize.DATE,
			allowNull: true,
		});
		await queryInterface.addColumn("Posts", "isPublished", {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Posts", "scheduledAt");
		await queryInterface.removeColumn("Posts", "isPublished");
	},
};
