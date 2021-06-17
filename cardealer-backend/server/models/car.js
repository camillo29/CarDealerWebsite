module.exports = (sequelize, DataTypes) => {
	const Car = sequelize.define('Car', {
		model: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		engineCapacity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		kilometersTraversed: {
			type: DataTypes.INTEGER,
			allowNull:false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull:false
		}
	});
	Car.associate = (models) => {
		Car.belongsTo(models.CarBrand, {
			foreignKey: 'carBrandId',
		});
		Car.belongsTo(models.FuelType, {
			foreignKey: 'fuelTypeId',
		});
		Car.belongsTo(models.GearBoxType, {
			foreignKey: 'gearBoxTypeId',
		})
		Car.belongsTo(models.Office, {
			foreignKey: 'officeId',
		})
		Car.belongsTo(models.Person, {
			foreignKey: 'personId',
			allowNull: true
		})
	};
	return Car;
};
	
	