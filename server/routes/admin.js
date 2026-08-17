import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getDashboardStats } from '../controllers/adminController.js';
import { getContacts, updateContactStatus } from '../controllers/contactController.js';
import { createProject, updateProject, deleteProject, getProjectsAdmin, publishProject } from '../controllers/projectAdminController.js';
import { createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { createDocument, updateDocument, deleteDocument } from '../controllers/documentController.js';
import { createPartner, updatePartner, deletePartner } from '../controllers/partnersController.js';
import { addGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { createAdminUser, deleteAdminUser, getUsers } from '../controllers/authController.js';

const router = express.Router();

router.get('/stats', authenticateToken, getDashboardStats);

router.get('/contacts', authenticateToken, getContacts);
router.patch('/contacts/:id/status', authenticateToken, updateContactStatus);

router.get('/projects', authenticateToken, getProjectsAdmin);
router.post('/projects', authenticateToken, createProject);
router.put('/projects/:slug', authenticateToken, updateProject);
router.delete('/projects/:slug', authenticateToken, deleteProject);
router.post('/projects/:slug/publish', authenticateToken, publishProject);

router.post('/news', authenticateToken, createNews);
router.put('/news/:slug', authenticateToken, updateNews);
router.delete('/news/:slug', authenticateToken, deleteNews);

router.post('/documents', authenticateToken, createDocument);
router.put('/documents/:slug', authenticateToken, updateDocument);
router.delete('/documents/:slug', authenticateToken, deleteDocument);

router.post('/gallery', authenticateToken, addGalleryItem);
router.delete('/gallery/:slug', authenticateToken, deleteGalleryItem);

router.post('/partners', authenticateToken, createPartner);
router.put('/partners/:slug', authenticateToken, updatePartner);
router.delete('/partners/:slug', authenticateToken, deletePartner);

router.get('/users', authenticateToken, getUsers);
router.post('/users', authenticateToken, createAdminUser);
router.delete('/users/:id', authenticateToken, deleteAdminUser);

export default router;
