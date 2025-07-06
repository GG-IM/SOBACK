import express from 'express';
import AppointmentController from '../controllers/appointmentController.js';
const router = express.Router();

router.get('/', AppointmentController.getAll);
router.get('/:id', AppointmentController.getById);
router.post('/', AppointmentController.create);
router.put('/:id', AppointmentController.update);
router.delete('/:id', AppointmentController.delete);

export default router; 