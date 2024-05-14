module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define('Country', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    // Create the relationship to the dishes. A dish can have many countries.
    Country.associate = function(models) {
        Country.hasMany(models.Dishes);
    };
	return Country
}