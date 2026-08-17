import express from 'express';
import { getHomeData } from '../controllers/contentController.js';

const router = express.Router();

router.get('/home', getHomeData);

export default router;
