import express from 'express';
import DoctorController from '../controllers/doctorController.js';
const router = express.Router();

router.get('/', DoctorController.getAll);
router.get('/:id', DoctorController.getById);
router.post('/', DoctorController.create);
router.put('/:id', DoctorController.update);
router.delete('/:id', DoctorController.delete);

export default router; 