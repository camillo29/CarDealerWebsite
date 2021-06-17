module.exports = (sequelize, DataTypes) => {
	const GearBoxType = sequelize.define('GearBoxType', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	GearBoxType.associate = (models) => {
		GearBoxType.hasMany(models.Car, {
			foreignKey: 'gearBoxTypeId',
			as: 'gearBoxTypeId',
			allowNull: false,
			constraints: false,
		});
	};
	return GearBoxType;
};