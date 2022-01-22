const express = require('express');

const coffeeController = require('../controllers/coffeeController');

const router = express.Router();

router.get('/',
  coffeeController.getAllCoffee,
  (req, res) => {
    return res.status(200).json(res.locals.coffees);
  }
);

router.get('/:id',
  coffeeController.getCoffee,
  (req, res) => res.status(200).json(res.locals.coffee)
);

router.post('/',
  coffeeController.addCoffee,
  (req, res) => res.status(200).json(res.locals.insertedCoffee)
);

router.put('/:id',
  coffeeController.updateCoffee,
  (req, res) => res.status(200).json(res.locals.updatedCoffee)
);

router.delete('/:id',
  coffeeController.deleteCoffee,
  (req, res) => res.status(200).json('Succesfully deleted coffee entity')
);

module.exports = router;