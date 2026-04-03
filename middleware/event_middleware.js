const Event  = require('../models/eventModel');

const requireClubOwnership = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.clubId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only access your own events' });
    }

    req.event = event;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { requireClubOwnership };