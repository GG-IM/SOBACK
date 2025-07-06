import pool from '../utils/db.js';

function toMySQLDateTime(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toISOString().slice(0, 19).replace('T', ' ');
}

const AppointmentModel = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT a.*, 
             p.name as patientName, p.phone as patientPhone,
             d.name as doctorName
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
    `);
    return rows;
  },

  async getByDoctorId(doctorId) {
    const [rows] = await pool.query(`
      SELECT a.*, 
             p.name as patientName, p.phone as patientPhone,
             d.name as doctorName
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.doctor_id = ?
    `, [doctorId]);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ?', [id]);
    return rows[0];
  },

  async create(appointment) {
    const { doctor_id, patient_id, date, reason, status, note } = appointment;
    const mysqlDate = toMySQLDateTime(date);
    const [result] = await pool.query(
      'INSERT INTO appointments (doctor_id, patient_id, date, reason, status, note) VALUES (?, ?, ?, ?, ?, ?)',
      [doctor_id, patient_id, mysqlDate, reason, status, note || null]
    );
    return result.insertId;
  },

  async update(id, appointment) {
    const { doctor_id, patient_id, date, reason, status, note } = appointment;
    const mysqlDate = toMySQLDateTime(date);
    const [result] = await pool.query(
      'UPDATE appointments SET doctor_id=?, patient_id=?, date=?, reason=?, status=?, note=? WHERE id=?',
      [doctor_id, patient_id, mysqlDate, reason, status, note || null, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM appointments WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default AppointmentModel; 