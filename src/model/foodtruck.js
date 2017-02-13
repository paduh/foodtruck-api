import mongoose from 'mongoose';
import Review from './review'
import Report from './report'
let Schema = mongoose.Schema;

let foodtruckSchema = new Schema({
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
      type: {type: String, default: 'point'},
      coordinates: {
        lat: Number,
        long: Number
      }
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    reports: [{type: Schema.Types.ObjectId, ref: 'Report'}]
});

module.exports = mongoose.model('FoodTruck', foodtruckSchema);
