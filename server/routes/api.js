import express from 'express';
import authRoutes from './auth.js';
import contentRoutes from './content.js';
import projectsRoutes from './projects.js';
import documentsRoutes from './documents.js';
import newsRoutes from './news.js';
import galleryRoutes from './gallery.js';
import partnersRoutes from './partners.js';
import contactRoutes from './contact.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/projects', projectsRoutes);
router.use('/documents', documentsRoutes);
router.use('/news', newsRoutes);
router.use('/gallery', galleryRoutes);
router.use('/partners', partnersRoutes);
router.use('/contact', contactRoutes);

export default router;
