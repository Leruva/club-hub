const service = require('./admin_services');

const getPendingClubs = async (req, res) => {
  try {
    const clubs = await service.getPendingClubs();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveClub = async (req, res) => {
  try {
    const result = await service.approveClub(req.params.id, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectClub = async (req, res) => {
  try {
    const result = await service.rejectClub(
      req.params.id,
      req.body.rejectionReason,
      req.user.id
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPendingEvents = async (req, res) => {
  try {
    const events = await service.getPendingEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveEvent = async (req, res) => {
  try {
    const result = await service.approveEvent(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectEvent = async (req, res) => {
  try {
    const result = await service.rejectEvent(req.params.id, req.body.rejectionReason);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPendingClubs,
  approveClub,
  rejectClub,
  getPendingEvents,
  approveEvent,
  rejectEvent,
};