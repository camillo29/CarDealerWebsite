module.exports = (sequelize, DataTypes) => {
	const Person = sequelize.define('Person', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		eMail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.DECIMAL,
			allowNull: true,
		}
	});
	Person.associate = (models) => {
		Person.hasMany(models.Car, {
			foreignKey: 'personId',
			as: 'personId',
			allowNull: true,
			constraints: false,
		}),
		Person.belongsTo(models.User, {
			foreignKey: 'userId',
		})
	};
	return Person;
};