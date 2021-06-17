'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false
            },
            engineCapacity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            kilometersTraversed: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            carBrandId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'CarBrands',
                    key: 'id',
                    as: 'carBrandId'
                },
            },
            fuelTypeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'FuelTypes',
                    key: 'id',
                    as: 'fuelTypeId'
                }
            },
            gearBoxTypeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'GearBoxTypes',
                    key: 'id',
                    as: 'gearBoxTypeId'
                }
            },
            officeId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Offices',
                    key: 'id',
                    as: 'officeId'
                }
            },
            personId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'People',
                    key: 'id',
                    as: 'personId'
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Cars');
    }
};