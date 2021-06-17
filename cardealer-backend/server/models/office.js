module.exports = (sequelize, DataTypes) => {
	const Office = sequelize.define('Office', {
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false
		},
		postCode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	Office.associate = (models) => {
		Office.hasMany(models.Car, {
			foreignKey: 'officeId',
			as: 'officeId',
			allowNull: false,
			constraints: false,
		});
	};
	return Office;
};