const { QueryTypes } = require('sequelize');

class DishesService {
	constructor(db) {
		this.client = db.sequelize;
		this.Dishes = db.Dishes;
		this.Country = db.Country;
	}

	async createDish(name, country) {
		try {
			let CountryId;
			// Check if the country is in the database
			const hasCountry = await this.Country.findOne({
				where: {
					name: country,
				},
			});

			if (!hasCountry) {
				// If the country is not in the database, then we create the country and get the id
				const result = await this.Country.create({ Name: country });
				CountryId = result.dataValues.id;
			} else {
				CountryId = hasCountry.dataValues.id;
			}

			// Check if the country and dish is already in the database
			const alreadyInDatabase = await this.Dishes.findAll({
				where: {
					Name: name,
					CountryId: CountryId,
				},
			});

			if (alreadyInDatabase.length == 0) {
				// If the dish and country is not in the database, we create it
				const createDish = await this.Dishes.create({ Name: name, CountryId: CountryId });
				return { message: 'Dish created' };
			}

			return { message: 'Dish and country already in the database' };
		} catch (err) {
			throw new Error(err);
		}
	}

	async getAllDishes() {
		// Create a JOIN RAW query to get the country and dish. Sequelize functions also can be used here
		let Dishes = await this.client.query('SELECT Dishes.Id, Dishes.Name as DishName, Countries.Name as Country FROM Dishes JOIN Countries on Dishes.CountryId = Countries.Id', { type: QueryTypes.SELECT });
		return Dishes;
	}

	async getDish(dishname) {
		// Create a JOIN RAW query to get the country and dish. Sequelize functions also can be used here
		let Dishes = await this.client.query(`SELECT Dishes.Id, Dishes.Name as DishName, Countries.Name as Country FROM Dishes JOIN Countries on Dishes.CountryId = Countries.Id WHERE Dishes.name = '${dishname}'`, { type: QueryTypes.SELECT });
		return Dishes;
	}
	
	async deleteDish(dishName) {
		try {
			// Find the dish by name
			const dish = await this.Dishes.findOne({
				where: {
					Name: dishName
				}
			});
	
			if (!dish) {
				return { message: 'Dish not found' };
			}
	
			// Delete the dish
			await this.Dishes.destroy({
				where: {
					Name: dishName
				}
			});
	
			return { message: 'Dish deleted successfully' };
		} catch (error) {
			throw new Error(error);
		}
	}
}
module.exports = DishesService;
