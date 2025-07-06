import express from 'express';
import NotificationController from '../controllers/notificationController.js';
const router = express.Router();

router.get('/', NotificationController.getAll);
router.get('/:id', NotificationController.getById);
router.post('/', NotificationController.create);
router.put('/:id', NotificationController.update);
router.delete('/:id', NotificationController.delete);

export default router; 