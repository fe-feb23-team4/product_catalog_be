/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, _next) {
  res.render('index', { title: 'Express' });
});

export default router;
