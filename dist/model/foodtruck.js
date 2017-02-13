'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

var _report = require('./report');

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var foodtruckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodtype: {
    type: String,
    required: true
  },
  avgcost: Number,
  geometry: {
    type: { type: String, default: 'point' },
    coordinates: {
      lat: Number,
      long: Number
    }
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }]
});

module.exports = _mongoose2.default.model('FoodTruck', foodtruckSchema);
//# sourceMappingURL=foodtruck.js.map