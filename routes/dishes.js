var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var DishesService = require('../services/DishesService');
var db = require('../models');
var dishesService = new DishesService(db);

/* GET All dishes */
router.get('/', async function (req, res, next) {
	try {
		const Dishes = await dishesService.getAllDishes();
		res.status(200).send({ statuscode: 200, dishes: Dishes });
	} catch (error) {
		console.log(error);
	}
});

/* GET Specific dish from the dish name */
router.get('/:dishname', async function (req, res, next) {
	try {
		const Dishes = await dishesService.getDish(req.params.dishname);
		res.status(200).send({ statuscode: 200, dishes: Dishes });
	} catch (error) {
		res.status(500).send({ statuscode: 500, error: error.message });
	}
});

/* POST create a new dish for the country and add country if the country is not in the database*/
router.post('/', jsonParser, async function (req, res, next) {
	try {
		let { Name, Country } = req.body;
		let result = await dishesService.createDish(Name, Country);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send({ statuscode: 500, error: error.message });
	}
});

/* DELETE delete a dish by dish name */
router.delete('/', jsonParser, async function (req, res, next) {
    try {
        const { Name } = req.body;
        // Call a function in your service to delete the dish by name
        const result = await dishesService.deleteDish(Name);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ statuscode: 500, error: error.message });
    }
});

module.exports = router;
