const  Event  = require('../../models/eventModel');
const  Registration  = require('../../models/registrationModel');
const  Hiring  = require('../../models/hiringModel');
const  Announcement  = require('../../models/announcementModel');
const  User  = require('../../models/userModel');
const  ClubMember  = require('../../models/clubMemberModel');

const getMyInsights = async (req, res) => {
  try {
    const clubId = req.user.id;

    const events = await Event.find({ clubId });
    const eventIds = events.map(e => e._id);

    const [totalRegistrations, openHirings, announcementsPosted, topEventAgg] = await Promise.all([
      Registration.countDocuments({ eventId: { $in: eventIds } }),
      Hiring.countDocuments({ clubId, status: 'open' }),
      Announcement.countDocuments({ clubId }),
      Registration.aggregate([
        { $match: { eventId: { $in: eventIds } } },
        { $group: { _id: '$eventId', registrations: { $sum: 1 } } },
        { $sort: { registrations: -1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: '_id',
            as: 'event'
          }
        }
      ])
    ]);
    const topEvent = topEventAgg[0]?.event?.[0]
      ? {
          title: topEventAgg[0].event[0].title,
          registrations: topEventAgg[0].registrations,
        }
      : null;

    const avgRegistrationsPerEvent = events.length
      ? totalRegistrations / events.length
      : 0;
    res.json({
      totalEvents: events.length,
      totalRegistrations,
      avgRegistrationsPerEvent,
      topEvent,
      openHirings,
      announcementsPosted,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    const clubId = req.user.clubId;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingMember = await ClubMember.findOne({ user: user._id, club: clubId });
    if (existingMember) {
      return res.status(400).json({ message: 'User is already a member of this club' });
    }

    const member = await ClubMember.create({
      user: user._id,
      club: clubId,
      role: role || 'member'
    });

    res.status(201).json({ message: 'Member added successfully', member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMembers = async (req, res) => {
  try {
    const clubId = req.user.clubId;
    const members = await ClubMember.find({ club: clubId }).populate('user', 'fullName email course year');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMyInsights, addMember, getMembers }; 