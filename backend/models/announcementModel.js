const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  targetAudience: {
    type: String,
    enum: ['all', 'registered'],
    default: 'all',
  },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);