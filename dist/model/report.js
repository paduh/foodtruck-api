'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _foodtruck = require('./foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ReportSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  text: String,

  foodtruk: {
    type: Schema.Types.ObjectId,
    ref: 'FoodTruck'
  },

  foodtruckreview: {
    type: Schema.Types.ObjectId,
    ref: 'FoodTruckReview'
  }
});

module.exports = _mongoose2.default.model('Review', 'ReviewSchema');
//# sourceMappingURL=report.js.map