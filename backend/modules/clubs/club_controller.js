const  Event  = require('../../models/eventModel');
const  Registration  = require('../../models/registrationModel');
const  Hiring  = require('../../models/hiringModel');
const  Announcement  = require('../../models/announcementModel');

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
module.exports = { getMyInsights };