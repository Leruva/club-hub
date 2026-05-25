const Event = require('../../models/eventModel');
const Announcement = require('../../models/announcementModel');    
const Hiring = require('../../models/hiringModel');

const getStudentFeed = async (req, res) => {
  try {
    const [events, announcements, hirings] = await Promise.all([
      Event.find({ status: 'published' }).sort({ createdAt: -1 }).limit(10),
      Announcement.find().sort({ createdAt: -1 }).limit(10),
      Hiring.find({ status: 'open' }).sort({ createdAt: -1 }).limit(10),
    ]);

    res.json({
      events,
      announcements,
      hirings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStudentFeed,
};