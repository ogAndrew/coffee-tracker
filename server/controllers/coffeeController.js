const db = require('../models/coffeeModels');

const coffeeController = {};

coffeeController.getAllCoffee = async (req, res, next) => {
  try {
    const str = 'SELECT * FROM coffees';
    const response = await db.query(str);
    console.log('called all coffee');
    res.locals.coffees = response.rows;
    return next()
  } catch(e) {
    return next({
      log: 'coffeeController.getAllCoffee: ERROR: Error getting coffee data from database',
      message: { err: 'Error occured in coffeeController.getAllCoffee. Check server logs for more details'}
    })
  }
}

coffeeController.getCoffee = async (req, res, next) => {
  const { id } = req.params;
  const str = 'SELECT * FROM coffees WHERE _id = $1';
  const values = [id]

  
  try {
    const response = await db.query(str, values);
    res.locals.coffee = response.rows[0];
    return next();
  } catch(e) {
    return next({
      log: 'coffeeController.getCoffee: ERROR: Error getting coffee data from database',
      message: { err: 'Error occured in coffeeController.getCoffee. Check server logs for more details'}
    })

  }
}

coffeeController.addCoffee = async (req, res, next) => {
  const str = 'INSERT INTO coffees(name, roaster, region, process, score) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const data = [
    req.body.name,
    req.body.roaster,
    req.body.region,
    req.body.process,
    req.body.score
  ]

  try {
    const response = await db.query(str, data);
    res.locals.insertedCoffee = response.rows[0];
    return next();
  } catch(e) {
    return next({
      log: 'coffeeController.addCoffee: ERROR: Error getting coffee data from database',
      message: { err: 'Error occured in coffeeController.addCoffee. Check server logs for more details'}
    })
  }
}

coffeeController.updateCoffee = async (req, res, next) => {
  console.log('updating coffee');
  const { id } = req.params;
  const str = 'UPDATE coffees SET name = $1, roaster = $2, region = $3, process = $4, score = $5 WHERE _id = $6 RETURNING *';

  const data = [
    req.body.name,
    req.body.roaster,
    req.body.region,
    req.body.process,
    req.body.score,
    id
  ]

  try {
    const response = await db.query(str, data);
    console.log(response)
    res.locals.updatedCoffee = response.rows[0];
    return next();
  } catch(e) {
    return next({
      log: 'coffeeController.updateCoffee: ERROR: Error getting coffee data from database',
      message: { err: 'Error occured in coffeeController.updateCoffee. Check server logs for more details'}
    })
  }
}

coffeeController.deleteCoffee = async (req, res, next) => {
  console.log('deleting coffee')

  const { id } = req.params; 
  
  const getCoffeeQuery = 'SELECT * FROM coffees WHERE _id = $1'
  const deleteQuery = 'DELETE FROM coffees WHERE _id = $1;';
  const values = [id];
  
  try {
    const getResponse = await db.query(getCoffeeQuery, values);

    if(getResponse.rows.length === 0) {
      return next({
        status: 400, 
        log: 'DELETE ERROR: Express error handler caught in deleteCoffee middleware error',
        message: { err: 'DELETE ERROR: Could not delete coffee entity. Coffee is not found in request' } 
      })
    }
    
    await db.query(deleteQuery, values);
    
    return next();

  } catch(e) {
    return next({
      status: 400, 
      log: 'DELETE ERROR: Express error handler caught in deleteCoffee middleware error',
      message: { err: e } 
    })
  }
}

module.exports = coffeeController;