module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		eMail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});
	User.associate = (models) => {
		User.belongsToMany(models.Role, {
			through: 'UserRoles',
			as: 'roles',
			foreignKey: 'userId',
			otherKey: 'roleId'
		})
		User.hasOne(models.Person, {
			foreignKey: 'userId',
			allowNull: false,
		})
	}
	return User;
};