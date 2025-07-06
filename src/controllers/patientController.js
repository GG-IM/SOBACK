import PatientModel from '../models/patientModel.js';

const PatientController = {
  async getAll(req, res) {
    try {
      const patients = await PatientModel.getAll();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const patient = await PatientModel.getById(req.params.id);
      if (!patient) return res.status(404).json({ error: 'Paciente no encontrado' });
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const patient = req.body;
      const id = await PatientModel.create(patient);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const patient = req.body;
      const affected = await PatientModel.update(id, patient);
      if (!affected) return res.status(404).json({ error: 'Paciente no encontrado' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const affected = await PatientModel.delete(id);
      if (!affected) return res.status(404).json({ error: 'Paciente no encontrado' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default PatientController; 