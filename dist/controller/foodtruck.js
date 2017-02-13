'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _report = require('../model/report');

var _report2 = _interopRequireDefault(_report);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/restaurant/add'
  api.post('/add', _authMiddleware.authenticate, function (req, res) {
    var newFoodTruck = new _foodtruck2.default();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.avgcost = req.body.avgcost;
    newFoodTruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    newFoodTruck.geometry.coordinates.long = req.body.geometry.coordinates.long;

    newFoodTruck.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'FoodTruck saved successfully' });
    });
  });

  // '/V1/restaurant'- read
  api.get('/', function (req, res) {
    _foodtruck2.default.find({}, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // '/v1/restaurant/:id'- Read 1
  api.get('/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // 'v1/restaurant/:id' - Update
  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      foodTruck.name = req.body.name;
      newFoodTruck.foodtype = req.body.foodtype;
      newFoodTruck.avgcost = req.body.avgcost;
      newFoodTruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
      newFoodTruck.geometry.coordinates.long = req.body.geometry.coordinates.long;
      foodTruck.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "FoodTruck info updated" });
      });
    });
  });

  // '/v1/restaurant/:id' - Delete
  api.delete('/:id', function (req, res) {
    foodtruck.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (foodtruck === null) {
        res.status(404).send("FoodTruck not found");
        return;
      }
      _foodtruck2.default.remove({
        _id: req.params.id
      }, function (err, foodtruck) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        _review2.default.remove({
          foodtruck: req.params.id
        }), function (err, review) {
          if (err) {
            res.status(500).send(err);
            return;
          }
        };
        res.json({ message: "FoodTruck successfully remoned" });
      });
    });
  });

  // Add review for a specific food truck Id
  // 'v1/foodtruck/reviews/add/:id'

  api.post('/reviews/add/:id', _authMiddleware.authenticate, function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.foodtruck = foodtruck._id;

      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReview);
        foodtruck.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: " FoodTruck review saved successfully" });
        });
      });
    });
  });

  // retrieve all reviews for a specific food truck id
  // '/v1/foodtruck/reviews/:id'
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ foodtruck: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  //Post new report flag by user for a FoodTruck
  api.post('/report/add/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      var newReport = new _report2.default();

      newReport.title = req.body.title;
      newReport.foodtruck = foodtruck._id;

      newReport.save(function (err, report) {
        if (err) {
          res.send(err);
        }
        foodtruck, reports.push(newReport);
        foodtruck.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: " FoodTruck report saved successfully" });
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=foodtruck.js.map