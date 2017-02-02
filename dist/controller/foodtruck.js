'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/restaurant/add'
  api.post('/add', function (req, res) {
    var newFoodTruck = new _foodtruck2.default();
    newFoodTruck.name = req.body.name;

    newFoodTruck.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'FoodTruck saved successfully' });
    });
  });

  // '/V1/restaurant'- read
  api.get('/', function (req, res) {
    FoodTruckfind({}, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // '/v1/restaurant/:id'- Read 1
  api.get('/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodTruck) {
      if (err) {
        res.send(err);
      }
      res.json(foodTruck);
    });
  });

  // 'v1/restaurant/:id' - Update
  api.put('/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodTruck) {
      if (err) {
        res.send(err);
      }
      foodTruck.name = req.body.name;
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
    _foodtruck2.default.remove({
      _id: req.params.id
    }, function (err, foodTruck) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "FoodTruck successfully remoned" });
    });
  });

  return api;
};
//# sourceMappingURL=foodtruck.js.map