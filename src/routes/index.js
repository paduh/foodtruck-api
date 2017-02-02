import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializedDb from '../db';
import foodtruck from '../controller/foodtruck';
import account from '../controller/account';

let router = express();

// Connect to Db

initializedDb(db => {

  //Internal Middleware
  router.use(middleware({ config, db }));

  // API Routes V1 /V1
  router.use('/foodtruck', foodtruck({ config, db }));
  router.use('/account', account({ config, db }));

});

export default router;
