const Event = require('../../models/eventModel');
const Announcement = require('../../models/announcementModel');    
const Hiring = require('../../models/hiringModel');
const User = require('../../models/userModel');
const Registration = require('../../models/registrationModel');

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

const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const allowedUpdates = ['fullName', 'profileImage', 'year', 'course', 'interests', 'collegeId'];
    const updateData = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



module.exports = {
  getStudentFeed,
  getStudentProfile,
  updateStudentProfile,
  
};