module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define('Role', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	Role.associate = (models) => { 
		Role.belongsToMany(models.User, {
			through: 'UserRoles',
			as: 'users',
			foreignKey: 'roleId',
			otherKey: 'userId'
		})
	}
	return Role;
};