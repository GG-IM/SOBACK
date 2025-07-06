import pool from '../utils/db.js';

const NotificationModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM notifications');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE id = ?', [id]);
    return rows[0];
  },

  async create(notification) {
    const { id, user_id, type, message, read_status } = notification;
    const [result] = await pool.query(
      'INSERT INTO notifications (id, user_id, type, message, read_status) VALUES (?, ?, ?, ?, ?)',
      [id, user_id, type, message, read_status]
    );
    return result.insertId;
  },

  async update(id, notification) {
    const { user_id, type, message, read_status } = notification;
    const [result] = await pool.query(
      'UPDATE notifications SET user_id=?, type=?, message=?, read_status=? WHERE id=?',
      [user_id, type, message, read_status, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM notifications WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default NotificationModel; 