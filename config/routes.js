var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var bodyParser = require('body-parser');

//routes
router.route('/users/new')
  .get(usersController.new);

module.exports = router;
