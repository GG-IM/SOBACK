import pool from '../utils/db.js';

const DoctorModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM doctors');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    return rows[0];
  },

  async create(doctor) {
    const { id, name, specialty, license_number, phone, email, available, schedule_start, schedule_end } = doctor;
    const [result] = await pool.query(
      'INSERT INTO doctors (id, name, specialty, license_number, phone, email, available, schedule_start, schedule_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, specialty, license_number, phone, email, available, schedule_start, schedule_end]
    );
    return result.insertId;
  },

  async update(id, doctor) {
    const { name, specialty, license_number, phone, email, available, schedule_start, schedule_end } = doctor;
    const [result] = await pool.query(
      'UPDATE doctors SET name=?, specialty=?, license_number=?, phone=?, email=?, available=?, schedule_start=?, schedule_end=? WHERE id=?',
      [name, specialty, license_number, phone, email, available, schedule_start, schedule_end, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM doctors WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default DoctorModel; 