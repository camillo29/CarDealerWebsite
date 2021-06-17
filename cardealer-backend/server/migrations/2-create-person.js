'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
          type: Sequelize.STRING,
          allowNull: false
      },
      eMail: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      phoneNumber: {
          type: Sequelize.DECIMAL,
          allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        allowNull: false, 
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('People');
  }
};