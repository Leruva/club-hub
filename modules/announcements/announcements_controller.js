const Announcement = require('../../models/announcementModel');

const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      clubId: req.user.id,
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllAnnouncements = async (req, res) => {
  const list = await Announcement.find().sort({ createdAt: -1 });
  res.json(list);
};

const updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findOneAndUpdate(
      { _id: req.params.id, clubId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Announcement not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findOneAndDelete({
      _id: req.params.id,
      clubId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createAnnouncement,
    getAllAnnouncements,
    updateAnnouncement,
    deleteAnnouncement,
}