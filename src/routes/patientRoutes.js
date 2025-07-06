import express from 'express';
import PatientController from '../controllers/patientController.js';
const router = express.Router();

router.get('/', PatientController.getAll);
router.get('/:id', PatientController.getById);
router.post('/', PatientController.create);
router.put('/:id', PatientController.update);
router.delete('/:id', PatientController.delete);

export default router; 