import express from 'express';
import { getGallery, addGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', addGalleryItem);
router.delete('/:slug', deleteGalleryItem);

export default router;
