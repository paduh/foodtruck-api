import mongoose from 'mongoose';
import FoodTruck from './foodtruck';
import Report from './report';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,

  foodtruck: {
    type: Schema.Types.ObjectId,
    ref: 'FoodTruck',
    required: true
  },

  reports: [{type: Schema.Types.ObjectId, ref: 'Report'}]
});
module.exports =  mongoose.model('Review', ReviewSchema);
