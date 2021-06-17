module.exports = (sequelize, DataTypes) => {
	const CarBrand = sequelize.define('CarBrand', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	CarBrand.associate = (models) => {
		CarBrand.hasMany(models.Car, {
			foreignKey: 'carBrandId',
			as: 'carBrandId',
			allowNull: false,
			constraints: false,
		});
	};
	return CarBrand;
};