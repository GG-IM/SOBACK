import DoctorModel from '../models/doctorModel.js';

const DoctorController = {
  async getAll(req, res) {
    try {
      const doctors = await DoctorModel.getAll();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const doctor = await DoctorModel.getById(req.params.id);
      if (!doctor) return res.status(404).json({ error: 'Doctor no encontrado' });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const doctor = req.body;
      const id = await DoctorModel.create(doctor);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const doctor = req.body;
      const affected = await DoctorModel.update(id, doctor);
      if (!affected) return res.status(404).json({ error: 'Doctor no encontrado' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const affected = await DoctorModel.delete(id);
      if (!affected) return res.status(404).json({ error: 'Doctor no encontrado' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default DoctorController; 