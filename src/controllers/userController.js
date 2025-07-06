import UserModel from '../models/userModel.js';

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const user = req.body;
      const id = await UserModel.create(user);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      const affected = await UserModel.update(id, user);
      if (!affected) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const affected = await UserModel.delete(id);
      if (!affected) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default UserController; 