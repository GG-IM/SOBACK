import express from 'express';
import UserController from '../controllers/userController.js';
import pool from '../utils/db.js';
const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?', 
      [email, password]
    );
    if (rows.length > 0) {
      const user = rows[0];
      res.json(user);
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 