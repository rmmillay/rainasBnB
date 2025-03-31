'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ReviewImages', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            url: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            reviewId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Reviews",
                    key: "id"
                },
                onDelete: "CASCADE"
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, options);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ReviewImages');
    }
};
