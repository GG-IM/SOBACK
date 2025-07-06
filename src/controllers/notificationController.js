import NotificationModel from '../models/notificationModel.js';

const NotificationController = {
  async getAll(req, res) {
    try {
      const notifications = await NotificationModel.getAll();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const notification = await NotificationModel.getById(req.params.id);
      if (!notification) return res.status(404).json({ error: 'Notificación no encontrada' });
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const notification = req.body;
      const id = await NotificationModel.create(notification);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const notification = req.body;
      const affected = await NotificationModel.update(id, notification);
      if (!affected) return res.status(404).json({ error: 'Notificación no encontrada' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const affected = await NotificationModel.delete(id);
      if (!affected) return res.status(404).json({ error: 'Notificación no encontrada' });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default NotificationController; 