module.exports = (sequelize, Sequelize) => {
    const Dishes = sequelize.define('Dishes', {
        Name: Sequelize.DataTypes.STRING,

    },{
        timestamps: false
    });
	return Dishes
}