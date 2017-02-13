import mongoose from  'mongoose';
import FoodTruck from './foodtruck';
import FoodTruckReview  from './review';
let Schema = mongoose.Schema;

let ReportSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  text: String,

  foodtruck: {
    type: Schema.Types.ObjectId,
    ref: 'FoodTruck'
  },

  foodtruckreview: {
    type: Schema.Types.ObjectId,
    ref: 'FoodTruckReview'
  }
});

module.exports = mongoose.model('Report', ReportSchema);
