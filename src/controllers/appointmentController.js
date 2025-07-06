import AppointmentModel from '../models/appointmentModel.js';
import PatientModel from '../models/patientModel.js';

const AppointmentController = {
  async getAll(req, res) {
    try {
      const { doctor_id } = req.query;
      console.log('🔍 Filtros de búsqueda:', { doctor_id });
      
      let appointments;
      if (doctor_id) {
        appointments = await AppointmentModel.getByDoctorId(doctor_id);
      } else {
        appointments = await AppointmentModel.getAll();
      }
      
      console.log('✅ Citas encontradas:', appointments.length);
      res.json(appointments);
    } catch (error) {
      console.log('❌ Error al obtener citas:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const appointment = await AppointmentModel.getById(req.params.id);
      if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const appointment = req.body;
      let patientId = appointment.patient_id;

      // Si no hay patient_id pero hay nombre y teléfono, busca o crea el paciente
      if (!patientId && appointment.name && appointment.phone) {
        let patient = await PatientModel.getByNameAndPhone(appointment.name, appointment.phone);
        if (!patient) {
          // Crea el paciente con los datos enviados
          const newPatient = {
            user_id: appointment.user_id || null,
            name: appointment.name,
            phone: appointment.phone,
            email: appointment.email,
            birthdate: appointment.birthdate || null
          };
          const newPatientId = await PatientModel.create(newPatient);
          patientId = newPatientId;
        } else {
          patientId = patient.id;
        }
      }

      // Asigna el patient_id correcto a la cita
      appointment.patient_id = patientId;

      const id = await AppointmentModel.create(appointment);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const appointment = req.body;
      const affected = await AppointmentModel.update(id, appointment);
      if (!affected) return res.status(404).json({ error: 'Cita no encontrada' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const affected = await AppointmentModel.delete(id);
      if (!affected) return res.status(404).json({ error: 'Cita no encontrada' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default AppointmentController; 