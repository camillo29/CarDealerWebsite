module.exports = (sequelize, DataTypes) => {
	const FuelType = sequelize.define('FuelType', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	FuelType.associate = (models) => {
		FuelType.hasMany(models.Car, {
			foreignKey: 'fuelTypeId',
			as: 'fuelTypeId',
			allowNull: false,
			constraints: false,
		});
	};
	return FuelType;
};