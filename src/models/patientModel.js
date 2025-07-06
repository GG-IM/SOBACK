import pool from '../utils/db.js';

const PatientModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM patients');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
    return rows[0];
  },

  async create(patient) {
    const { id, name, phone, email, birthdate, user_id } = patient;
    const [result] = await pool.query(
      'INSERT INTO patients (id, user_id, name, phone, email, birthdate) VALUES (?, ?, ?, ?, ?, ?)',
      [id, user_id, name, phone, email, birthdate]
    );
    return result.insertId;
  },

  async update(id, patient) {
    const { name, phone, email, birthdate } = patient;
    const [result] = await pool.query(
      'UPDATE patients SET name=?, phone=?, email=?, birthdate=? WHERE id=?',
      [name, phone, email, birthdate, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM patients WHERE id = ?', [id]);
    return result.affectedRows;
  },

  async getByUserId(user_id) {
    const [rows] = await pool.query('SELECT * FROM patients WHERE user_id = ?', [user_id]);
    return rows[0];
  },

  async getByNameAndPhone(name, phone) {
    const [rows] = await pool.query('SELECT * FROM patients WHERE name = ? AND phone = ?', [name, phone]);
    return rows[0];
  }
};

export default PatientModel; 