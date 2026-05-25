const Hiring = require('../../models/hiringModel');

const createHiring = async (req, res) => {
  try {
    const hiring = await Hiring.create({
      ...req.body,
      clubId: req.user.id,
    });
    res.status(201).json(hiring);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllOpenHirings = async (req, res) => {
  const list = await Hiring.find({ status: 'open' }).sort({ createdAt: -1 });
  res.json(list);
};

const updateHiring = async (req, res) => {
  try {
    const updated = await Hiring.findOneAndUpdate(
      { _id: req.params.id, clubId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Hiring not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteHiring = async (req, res) => {
  try {
    const deleted = await Hiring.findOneAndDelete({
      _id: req.params.id,
      clubId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: 'Hiring not found' });
    res.json({ message: 'Hiring deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createHiring,
  getAllOpenHirings,
  updateHiring,
  deleteHiring
};