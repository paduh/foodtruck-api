import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review'
import Report from '../model/report'

import { authenticate } from '../middleware/authMiddleware'

export default({ config, db }) => {
let api = Router();

  // '/v1/restaurant/add'
  api.post('/add', authenticate, (req, res) => {
    let newFoodTruck = new FoodTruck();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.avgcost = req.body.avgcost
    newFoodTruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    newFoodTruck.geometry.coordinates.long = req.body.geometry.coordinates.long;

    newFoodTruck.save(err => {
      if(err) {
        res.send(err)
        }
        res.json({message: 'FoodTruck saved successfully'});
    });
  });

  // '/V1/restaurant'- read
  api.get('/', (req, res) => {
    FoodTruck.find({}, (err, foodtrucks) => {
      if (err){
        res.send(err)
      }
      res.json(foodtrucks);
    });
  });

// '/v1/restaurant/:id'- Read 1
  api.get('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
      if (err){
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // 'v1/restaurant/:id' - Update
    api.put('/:id', authenticate,  (req, res) => {
      FoodTruck.findById(req.params.id, (err, foodtruck) => {
        if (err){
          res.send(err);
        }
        foodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost
        newFoodTruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
        newFoodTruck.geometry.coordinates.long = req.body.geometry.coordinates.long;
        foodTruck.save(err => {
          if (err) {
            res.send(err);
          }
            res.json({message: "FoodTruck info updated"});
        });
      });
    });

    // '/v1/restaurant/:id' - Delete
     api.delete('/:id', (req, res) => {
       foodtruck.findById(req.params.id, (err, foodtruck) => {
         if (err) {
           res.status(500).send(err);
           return;
         }
         if (foodtruck === null) {
           res.status(404).send("FoodTruck not found");
           return;
         }
         FoodTruck.remove({
           _id: req.params.id
         }, (err, foodtruck) =>{
           if (err) {
             res.status(500).send(err);
             return;
           }
           Review.remove({
             foodtruck: req.params.id
           }), (err, review) => {
             if (err) {
               res.status(500).send(err);
               return;
             }
           }
           res.json({message: "FoodTruck successfully remoned"});
         });
       });
     });


    // Add review for a specific food truck Id
    // 'v1/foodtruck/reviews/add/:id'

    api.post('/reviews/add/:id', authenticate, (req, res) => {
      FoodTruck.findById(req.params.id, (err, foodtruck) => {
        if(err) {
          res.send(err)
        }
        let newReview = new Review();

        newReview.title = req.body.title;
        newReview.text = req.body.text;
        newReview.foodtruck = foodtruck._id

        newReview.save((err, review) => {
          if (err) {
            res.send(err)
          }
          foodtruck.reviews.push(newReview);
          foodtruck.save(err  => {
            if (err) {
              res.send(err)
            }
            res.json({ message: " FoodTruck review saved successfully"});
          });
        });
      });
    });


    // retrieve all reviews for a specific food truck id
    // '/v1/foodtruck/reviews/:id'
    api.get('/reviews/:id', (req, res) => {
      Review.find({foodtruck: req.params.id}, (err, reviews) => {
        if (err) {
          res.send(err);
        }
        res.json(reviews);
      });
    });

    //Post new report flag by user for a FoodTruck
    api.post('/report/add/:id', authenticate, (req, res) => {
      FoodTruck.findById(req.params.id, (err, foodtruck) => {
        if (err) {
          res.send(err)
        }
        let newReport = new Report();

        newReport.title = req.body.title;
        newReport.foodtruck = foodtruck._id;

        newReport.save((err, report) => {
          if (err) {
            res.send(err)
          }
          foodtruck.reports.push(newReport);
          foodtruck.save(err => {
            if (err) {
              res.send(err)
            }
            res.json({ message: " FoodTruck report saved successfully"});
          });
        });
      });
    });

    //Add report for a Review
  api.post('/review/report/add/:id', authenticate, (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      if (err) {
        res.send(err)
      }
      let newRport = new Report();

      newRport.title = req.body.title;
      newRport.review = review._id;

      newRport.save((err, report) => {
        if (err) {
          res.send(err)
        }
        review.reports.push(newRport);
        review.save(err => {
          if (err) {
            res.send(err)
          }
          res.json({ message: "FoodTruckReview report saved successfully"})
        });
      });
    });
  });
  return api;
}
