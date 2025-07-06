import pool from '../utils/db.js';

const UserModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT id, name, email, role, active, created_at FROM users');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT id, name, email, role, active, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create(user) {
    const { id, name, email, password, role, doctor_id } = user;
    const [result] = await pool.query(
      'INSERT INTO users (id, name, email, password, role, doctor_id) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, email, password, role, doctor_id || null]
    );
    return result.insertId;
  },

  async update(id, user) {
    const { name, email, password, role, doctor_id, active } = user;
    const [result] = await pool.query(
      'UPDATE users SET name=?, email=?, password=?, role=?, doctor_id=?, active=? WHERE id=?',
      [name, email, password, role, doctor_id || null, active, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default UserModel; 